import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ChampionshipApiService } from './../../../services/api/championship-api.service';
import { Component, OnInit } from '@angular/core';
import { CustomButtonComponent } from "../../utils/custom-button/custom-button.component";
import { ActivatedRoute } from '@angular/router';
import { TrackLayout } from '../../../utils/interfaces/track.interface';
import { DialogModule } from 'primeng/dialog';
import { ChampionshipEntry, ChampionshipRound } from '../../../utils/interfaces/championship.interface';
import { CustomSelectComponent } from "../../utils/custom-select/custom-select.component";
import { User } from '../../../utils/interfaces/user.interface';
import {CustomRadioGroupComponent} from "../../utils/custom/custom-radio-group/custom-radio-group.component";
import {SessionFinishStates} from "../../../utils/enums/championship.enum";

@Component({
  selector: 'app-championship-results',
  standalone: true,
  imports: [CustomButtonComponent, DialogModule, CustomSelectComponent, ReactiveFormsModule, CustomRadioGroupComponent],
  templateUrl: './championship-results.component.html',
  styleUrl: './championship-results.component.scss'
})
export class ChampionshipResultsComponent implements OnInit {

  constructor(
    private championshipApiService: ChampionshipApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.resultsForm = this.formBuilder.group({
      positions: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    const champId = this.route.snapshot.params['champId'];

    this.championshipApiService.getCalendarById(champId).subscribe(res => {
      if (!res.data) {
        // TODO: Mostrar mensaje error

        return;
      }

      this.calendar = res.data!.calendar!
    });

    this.championshipApiService.getEntriesById(champId).subscribe(res => {
      if (!res.data) {
        // TODO: Mostrar mensaje error

        return;
      }

      res.data!.users!.forEach(_ => { // Se utiliza _ para indicar que la variable no se va a usar.
        this.positions.push(
          this.getPositionFormGroup()
        )
      });

      this.users = res.data.users?.map(item => item.user!)
    });
  }

  get positions(): FormArray {
    return this.resultsForm!.get('positions') as FormArray;
  }

  calendar?: ChampionshipRound[]
  users?: User[]
  isFilling = false;
  fillingIndex?: number;
  resultsForm?: FormGroup

  setFillingRound() {
    this.isFilling = true;
    this.fillingIndex = this.calendar!.length;
  }

  protected readonly SessionFinishStates = SessionFinishStates;
  protected readonly Object = Object;

  private getPositionFormGroup() {
    return this.formBuilder.group({
      driver: this.formBuilder.control(0, [Validators.required]),
      finishState: this.formBuilder.control(0, [Validators.required]),
    });
  }

  saveResults() {
    console.log(this.positions.value)
  }
}
