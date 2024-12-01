import {Component, inject, OnInit} from '@angular/core';
import {CustomSolidButtonComponent} from "../../../utils/button/solid-button/custom-solid-button.component";
import {CustomRadioGroupComponent} from "../../../utils/custom/input/custom-radio-group/custom-radio-group.component";
import {CustomSelectComponent} from "../../../utils/custom/input/custom-select/custom-select.component";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {
  ChampionshipEntry,
  ChampionshipRound,
  LeagueChampionship,
  Position,
  PositionCreation
} from "../../../../utils/interfaces/championship.interface";
import {EventApiService} from "../../../../services/api/event-api.service";
import {SessionFinishStates} from "../../../../utils/enums/championship.enum";
import {User} from "../../../../utils/interfaces/user.interface";
import {ChampionshipApiService} from "../../../../services/api/championship-api.service";
import {NgClass} from "@angular/common";
import {CustomDropdownComponent} from "../../../utils/dropdown/custom-dropdown/custom-dropdown.component";
import {CustomDropdownItemComponent} from "../../../utils/dropdown/custom-dropdown-item/custom-dropdown-item.component";
import {GlobalHelper} from "../../../../helpers/global.helper";
import {Driver} from "../../../../utils/interfaces/rfactor.interface";

@Component({
  selector: 'app-round-result-form',
  standalone: true,
  imports: [
    CustomSolidButtonComponent,
    CustomRadioGroupComponent,
    CustomSelectComponent,
    ReactiveFormsModule,
    NgClass,
    CustomDropdownComponent,
    CustomDropdownItemComponent
  ],
  templateUrl: './round-result-form.component.html',
  styleUrl: './round-result-form.component.scss'
})
export class RoundResultFormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private championshipService: ChampionshipApiService,
    private globalHelper: GlobalHelper,
  ) {}

  ngOnInit(): void {
    this.champId = +this.route.snapshot.params['champId'];

    this.championshipService.getByIdFull(this.champId).subscribe(res => {
      this.championship = res;
    });

    this.championshipService.getCalendarById(this.champId).subscribe(res => {
      this.calendar = res!.calendar
    });

    this.championshipService.getEntriesById(this.champId).subscribe(res => this.handleEntries(res));
  }

  private handleEntries(res: LeagueChampionship) {
    if (!res.users) {
      // TODO: Informar al usuario con un mensaje.
      return;
    }

    res.users.forEach(_ => { // Se utiliza _ para indicar que la variable no se va a usar.
      this.positionsForm.push(
        this.getPositionFormGroup()
      )
    });

    this.members = res!.users!;
    this.round = this.route.snapshot.params['round'];
  }

  round = 0
  champId?: number;
  calendar?: ChampionshipRound[];
  championship?: LeagueChampionship;
  results: Position[] = [];
  members?: ChampionshipEntry[];
  positions: Position[] = [];
  editing = true

  formBuilder = inject(FormBuilder)

  resultsForm = this.formBuilder.group({
    positions: this.formBuilder.array([])
  });

  get positionsForm(): FormArray {
    return this.resultsForm!.get('positions') as FormArray<FormGroup>;
  }

  private getPositionFormGroup() {
    return this.formBuilder.group({
      driverId: this.formBuilder.control(0, [Validators.required]),
      finishState: this.formBuilder.control(0, [Validators.required]),
    });
  }

  protected readonly SessionFinishStates = SessionFinishStates;
  protected readonly Object = Object;

  saveProgress() {
    const positionsCreated = this.positionsForm.value as PositionCreation[];

    positionsCreated.forEach((position) => {
      this.positions.push({
        driver: this.members!.find(item => item.user?.id === Number(position.driverId))!,
        finishState: position.finishState
      })
    })

    this.alternateMode(false);
  }

  alternateMode(editing: boolean) {
    this.editing = editing;
  }

  saveRoundResults() {

    // Se mapean los resultados para castear el ID de piloto a String a Number.
    const results: PositionCreation[] = (this.positionsForm.value as PositionCreation[]).map((position) => {
      return {
        ...position,
        driverId: +position.driverId
      }
    });

    this.championshipService.saveRoundResults(results, this.champId!).subscribe(res => {})
  }

  importRfactorFile = async () => {
    const files = await this.globalHelper.openFileDialog({
      validExtensions: ['xml'],
    }) as FileList;

    this.championshipService.sendRfactorResults(files[0], this.champId!, this.round).subscribe(res => this.handleRfactorResults(res));
  };

  private handleRfactorResults(drivers: Driver[]) {
    console.log(this.positionsForm)
    drivers.forEach((driver, index) => {

      const driverMatch = this.members?.find(member => member.user!.nickname || member.gameName === driver.Name);
      const driverControl = this.positionsForm.at(driver.Position - 1);

      if (driverMatch && driverControl) {
        console.log(driverMatch, index)
        driverControl.patchValue({
          position: driver.Position,
          driver: driverMatch,
          driverId: driverMatch.user!.id,
          finishState: 0
        })
      }
    })
  }
}
