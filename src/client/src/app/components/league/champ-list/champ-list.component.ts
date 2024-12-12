import {Component, Input} from '@angular/core';
import {LeagueChampionship} from "../../../utils/interfaces/championship.interface";
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";
import {Route} from "@angular/router";
import {GlobalHelper} from "../../../helpers/global.helper";
import {ImageComponent} from "../../utils/images/rounded-images/image.component";
import {SoftButtonComponent} from "../../utils/button/soft-button/soft-button.component";

@Component({
  selector: 'app-champ-list',
  standalone: true,
  imports: [
    CustomSolidButtonComponent,
    ImageComponent,
    SoftButtonComponent
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

  goToChamp(champId: number) {
    this.globalHelper.navigateFromRoot(`league/${this.leagueId}/championships/${champId}`);
  }
}
