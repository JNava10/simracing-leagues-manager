import {Component, inject, OnInit} from '@angular/core';
import {CustomButtonComponent} from "../../../utils/custom-button/custom-button.component";
import {CustomRadioGroupComponent} from "../../../utils/custom/custom-radio-group/custom-radio-group.component";
import {CustomSelectComponent} from "../../../utils/custom-select/custom-select.component";
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {
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

@Component({
  selector: 'app-round-result-form',
  standalone: true,
  imports: [
    CustomButtonComponent,
    CustomRadioGroupComponent,
    CustomSelectComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './round-result-form.component.html',
  styleUrl: './round-result-form.component.scss'
})
export class RoundResultFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private championshipService: ChampionshipApiService) {}

  ngOnInit(): void {
    this.champId = +this.route.snapshot.params['champId'];

    this.championshipService.getByIdFull(this.champId).subscribe(res => {
      this.championship = res;
    });

    this.championshipService.getCalendarById(this.champId).subscribe(res => {
      this.calendar = res!.calendar
    });

    this.championshipService.getEntriesById(this.champId).subscribe(res => {
      res!.users!.forEach(_ => { // Se utiliza _ para indicar que la variable no se va a usar.
        this.positionsForm.push(
          this.getPositionFormGroup()
        )
      });

      this.users = res!.users?.map(item => item.user!)
      this.round = this.route.snapshot.params['round'];

    });
  }

  round = 0
  champId?: number;
  calendar?: ChampionshipRound[];
  championship?: LeagueChampionship;
  results?: Position[];
  users?: User[];
  positions: Position[] = [];
  editing = true

  formBuilder = inject(FormBuilder)

  resultsForm = this.formBuilder.group({
    positions: this.formBuilder.array([])
  });

  get positionsForm(): FormArray {
    return this.resultsForm!.get('positions') as FormArray;
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
        driver: this.users!.find(item => item.id === Number(position.driverId))!,
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

    console.log(results);

    this.championshipService.saveRoundResults(results, this.champId!).subscribe(res => {})


  }
}
