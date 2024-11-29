import {Component, Input} from '@angular/core';
import {ChampionshipApiService} from "../../../services/api/championship-api.service";
import {GlobalHelper} from "../../../helpers/global.helper";
import {ScoreApiService} from "../../../services/api/score-api.service";
import {LeagueChampionship} from "../../../utils/interfaces/championship.interface";
import {CustomButtonComponent} from "../../utils/custom/input/custom-button/custom-button.component";
import {NgStyle} from "@angular/common";
import {
  CreateChampionshipOverviewComponent
} from "../createChampionship/create-championship-overview/create-championship-overview.component";

@Component({
  selector: 'app-champ-edit-overview',
  standalone: true,
  imports: [
    CustomButtonComponent,
    NgStyle,
    CreateChampionshipOverviewComponent
  ],
  templateUrl: './champ-edit-overview.component.html',
  styleUrl: './champ-edit-overview.component.scss'
})
export class ChampEditOverviewComponent {
  constructor(private championshipService: ChampionshipApiService, private globalHelper: GlobalHelper, private service: ScoreApiService) {}

  ngOnInit(): void {
    console.log(this.championship);
  }

  showingSummary = false;

  @Input() championship?: LeagueChampionship;

  editChamp = () => {
    this.championshipService.edit(this.championship!.id!, this.championship!).subscribe(res => this.handleEdit(res))
  };

  private handleEdit(res: LeagueChampionship) {

  }
}
