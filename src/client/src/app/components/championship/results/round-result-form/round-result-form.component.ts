import {Component, inject, OnInit} from '@angular/core';
import {CustomSolidButtonComponent} from "../../../utils/button/solid-button/custom-solid-button.component";
import {CustomRadioGroupComponent} from "../../../utils/custom/input/custom-radio-group/custom-radio-group.component";
import {CustomSelectComponent} from "../../../utils/custom/input/custom-select/custom-select.component";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {
  ChampionshipEntry,
  ChampionshipRound,
  LeagueChampionship,
  Position,
  PositionFormItem
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
    private router: Router,
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

  saveRoundResults() {
    const positionValues = this.positionsForm.value as PositionFormItem[];

    positionValues.forEach((position, index) => {
      this.positions.push({
        driverId: +position.driverId,
        position: index + 1,
        finishState: position.finishState
      });
    })

    this.saveResults();
  }

  saveResults() {
    if (this.positions && this.champId && this.round) {
      console.log(this.positions);

      this.championshipService.saveRoundResults(this.positions, this.champId, this.round).subscribe(res => {
        this.globalHelper.navigateFromRoot(`league/${this.championship?.leagueId}/championships/${this.champId}/results`);
      });
    }
  }

  importRfactorFile = async () => {
    const files = await this.globalHelper.openFileDialog({
      validExtensions: ['xml'],
      multiple: false
    }) as FileList;

    this.championshipService.sendRfactorResults(files[0], this.champId!, this.round).subscribe(res => this.handleRfactorResults(res));
  };

  private handleRfactorResults(drivers: Driver[]) {
    drivers.forEach((driver, index) => {

      // POST ENTREGA: Faltaba completar una comprobacion que estaba a medias, se estaba comprobando si existia el campo en vez de comparandolos.
      const driverMatch = this.members?.find(member => member.user!.nickname === driver.Name || member.gameName === driver.Name);
      const driverControl = this.positionsForm.at(driver.Position - 1);

      if (driverMatch && driverControl) {
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
