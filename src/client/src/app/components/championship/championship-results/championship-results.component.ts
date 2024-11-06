import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ChampionshipApiService } from './../../../services/api/championship-api.service';
import {Component, inject, OnInit} from '@angular/core';
import { CustomButtonComponent } from "../../utils/custom-button/custom-button.component";
import { ActivatedRoute } from '@angular/router';
import { TrackLayout } from '../../../utils/interfaces/track.interface';
import { DialogModule } from 'primeng/dialog';
import {
  ChampionshipEntry,
  ChampionshipRound, LeagueChampionship,
  Position,
  PositionCreation
} from '../../../utils/interfaces/championship.interface';
import { CustomSelectComponent } from "../../utils/custom-select/custom-select.component";
import { User } from '../../../utils/interfaces/user.interface';
import {CustomRadioGroupComponent} from "../../utils/custom/custom-radio-group/custom-radio-group.component";
import {SessionFinishStates} from "../../../utils/enums/championship.enum";
import {NgClass, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-championship-results',
  standalone: true,
  imports: [CustomButtonComponent, DialogModule, CustomSelectComponent, ReactiveFormsModule, CustomRadioGroupComponent, NgClass, SlicePipe],
  templateUrl: './championship-results.component.html',
  styleUrl: './championship-results.component.scss'
})
export class ChampionshipResultsComponent implements OnInit {

  constructor(
    private championshipApiService: ChampionshipApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.champId = +this.route.snapshot.params['champId'];

    this.championshipApiService.getByIdFull(this.champId).subscribe(res => {
      this.championship = res.data;
    });

    this.championshipApiService.getCalendarById(this.champId).subscribe(res => {
      if (!res.data) {
        // TODO: Mostrar mensaje error

        return;
      }

      this.calendar = res.data!.calendar!
    });

    this.championshipApiService.getEntriesById(this.champId).subscribe(res => {
      if (!res.data) {
        // TODO: Mostrar mensaje error

        return;
      }

      res.data!.users!.forEach(_ => { // Se utiliza _ para indicar que la variable no se va a usar.
        this.positionsForm.push(
          this.getPositionFormGroup()
        )
      });

      this.users = res.data.users?.map(item => item.user!)

      this.championshipApiService.getResults(this.champId!).subscribe(res => {
        this.results = res.data!;
        console.log(this.results)
        console.log(this.getDriverResults(1))
      });
    });
  }

  champId?: number;
  editing = true;
  calendar?: ChampionshipRound[];
  championship?: LeagueChampionship;
  results?: Position[];
  users?: User[];
  formBuilder = inject(FormBuilder)

  resultsForm = this.formBuilder.group({
    positions: this.formBuilder.array([])
  });

  private getPositionFormGroup() {
    return this.formBuilder.group({
      driverId: this.formBuilder.control(0, [Validators.required]),
      finishState: this.formBuilder.control(0, [Validators.required]),
    });
  }

  get positionsForm(): FormArray {
    return this.resultsForm!.get('positions') as FormArray;
  }

  positions: Position[] = [];

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
    const results:  PositionCreation[] = (this.positionsForm.value as PositionCreation[]).map((position) => {
      return {
        ...position,
        driverId: +position.driverId
      }
    });

    console.log(results);

    this.championshipApiService.saveRoundResults(results, this.champId!).subscribe(res => {})
  }

  getDriverResults(driverId: number) {
    return this.results!.find(result => result.driverId === driverId);
  }
}
