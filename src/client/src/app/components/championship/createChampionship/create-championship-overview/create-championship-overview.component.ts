import { Component, Input, OnInit } from '@angular/core';
import { LeagueChampionship } from '../../../../utils/interfaces/championship.interface';
import { ButtonTheme, CustomButtonComponent } from "../../../utils/custom-button/custom-button.component";
import { NgStyle } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-create-championship-overview',
  standalone: true,
  imports: [CustomButtonComponent, NgStyle, DialogModule],
  templateUrl: './create-championship-overview.component.html',
  styleUrl: './create-championship-overview.component.scss'
})
export class CreateChampionshipOverviewComponent implements OnInit {

  ngOnInit(): void {
    console.log(this.championship);
  }

  buttonTheme = ButtonTheme;

  showingSummary = false;

  @Input() championship?: LeagueChampionship;

  showSummary() {
    this.showingSummary = true;
  }
}
