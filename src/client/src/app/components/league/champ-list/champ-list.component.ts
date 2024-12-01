import {Component, Input} from '@angular/core';
import {LeagueChampionship} from "../../../utils/interfaces/championship.interface";
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";
import {Route} from "@angular/router";
import {GlobalHelper} from "../../../helpers/global.helper";

@Component({
  selector: 'app-champ-list',
  standalone: true,
  imports: [
    CustomSolidButtonComponent
  ],
  templateUrl: './champ-list.component.html',
  styleUrl: './champ-list.component.scss'
})
export class ChampListComponent {
  constructor(private globalHelper: GlobalHelper) {
  }

  @Input() championships?: LeagueChampionship[];
  @Input() leagueId?: number

  goToCreateChamp = () => {
    this.globalHelper.navigateFromRoot(`league/${this.leagueId}/championships/new`);
  };
}