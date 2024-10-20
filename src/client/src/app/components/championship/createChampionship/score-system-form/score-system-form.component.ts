import { GlobalHelper } from '../../../../helpers/global.helper';
import { PositionScore, ScoreSystem } from './../../../../utils/interfaces/score.interface';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CustomTextInputComponent } from "../../../utils/custom-text-input/custom-text-input.component";
import { Team } from '../../../../utils/interfaces/championship.interface';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from "../../../utils/custom-button/custom-button.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-score-system-form',
  standalone: true,
  templateUrl: './score-system-form.component.html',
  styleUrl: './score-system-form.component.scss',
  imports: [CustomTextInputComponent, CustomButtonComponent, NgClass, ReactiveFormsModule]
})
export class ScoreSystemFormComponent implements OnInit {

  ngOnInit(): void {
    this.gridSize = this.getGridSize()

    this.buildScoreForm(this.scores)
  }

  globalHelper = inject(GlobalHelper);
  formBuilder = inject(FormBuilder);

  scoresForm = this.formBuilder.group({
    scores: this.formBuilder.array<string>([])
  })

  get scores() {
    return this.scoresForm.controls.scores;
  }

  gridSize = 0;


  @Input() teams: Team[] = [];

  @Output() scoreSystemCreated = new EventEmitter<ScoreSystem>();

  private getGridSize() {
    let size = 0

    this.teams.forEach(team => {
     size += team.carEntries!;
    })

    return size;
  }

  protected saveScoreSystem() {
    const scoreSystem: ScoreSystem = {positions: []};

    this.scores.value.forEach((score, i) => {
      scoreSystem.positions![i] = {
        score: (Number(score!) > 0 ? Number(score!) : 0)
      }
    });


    this.scoreSystemCreated.emit(scoreSystem);
  }

  private buildScoreForm(array: FormArray)  {
    for (let i = 0; i < this.gridSize; i++) {
      array.push(
        this.formBuilder.control("")
      )
    }
  }
}
