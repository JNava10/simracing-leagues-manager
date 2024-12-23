import { GlobalHelper } from '../../../../helpers/global.helper';
import { PositionScore, ScoreSystem } from '../../../../utils/interfaces/score.interface';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CustomTextInputComponent } from "../../../utils/custom/input/custom-text-input/custom-text-input.component";
import {ChampionshipPreset, LeagueChampionship, Team} from '../../../../utils/interfaces/championship.interface';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSolidButtonComponent } from "../../../utils/button/solid-button/custom-solid-button.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-score-system-form',
  standalone: true,
  templateUrl: './score-system-form.component.html',
  styleUrl: './score-system-form.component.scss',
  imports: [CustomTextInputComponent, CustomSolidButtonComponent, NgClass, ReactiveFormsModule]
})
export class ScoreSystemFormComponent implements OnInit {

  ngOnInit(): void {
    if (this.championship && this.championship.teams) {
      this.gridSize = this.getGridSize(this.championship.teams);
    }

    if (this.preset) {
      this.gridSize = this.getGridSize(this.preset.teams)
      this.scoreValues = this.preset.scoreSystem.positions!.map(item => item.score!)
    }

    console.log(this.championship)


    if (this.championship && this.championship.scoreSystem) {
      this.scoreValues = this.championship.scoreSystem.positions!.map(item => item.score!)
    }

    this.buildScoreForm(this.scores)
  }

  @Input() preset?: ChampionshipPreset
  @Input() championship?: LeagueChampionship

  globalHelper = inject(GlobalHelper);
  formBuilder = inject(FormBuilder);

  scoreValues: number[] = []

  scoresForm = this.formBuilder.group({
    scores: this.formBuilder.array<FormGroup>([])
  })

  get scores() {
    return this.scoresForm.controls.scores as FormArray<FormGroup>;
  }

  gridSize: number = 0

  @Input() scoreSystem?: ScoreSystem;

  @Output() scoreSystemCreated = new EventEmitter<ScoreSystem>();

  private getGridSize(teams: Team[]) {
    let size = 0

    teams!.forEach(team => {
      size += team.carEntries!;
    })

    return size;
  }

  protected saveScoreSystem() {
    const scoreSystem: ScoreSystem = {positions: []};

    const scores = this.scores.value.map(item => item.score);

    scores.forEach((score, i) => {
      scoreSystem.positions![i] = {
        score: (Number(score) > 0 ? Number(score) : 0)
      }
    });

    this.scoreSystemCreated.emit(scoreSystem);
  }

  private buildScoreForm(array: FormArray)  {
    for (let i = 0; i < this.gridSize; i++) {
      array.push(
        this.formBuilder.group({
          score: this.scoreValues[i]
        })
      )
    }
  }

  getPlaceholder = (index: number) => {
    return `Puntuación para ${index + 1}ª pos.`
  };
}
