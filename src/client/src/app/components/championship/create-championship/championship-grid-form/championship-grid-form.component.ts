import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-championship-grid-form',
  standalone: true,
  imports: [],
  templateUrl: './championship-grid-form.component.html',
  styleUrl: './championship-grid-form.component.scss'
})
export class ChampionshipGridFormComponent {
  gridForm: FormGroup = new FormGroup({
    teamSize: new FormControl('')
  });

  get carCount() {
    return this.gridForm.get('count')!;
  }
}
