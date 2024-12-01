import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {League} from "../../../utils/interfaces/league.interface";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {Router} from "@angular/router";
import {ImageComponent} from "../../utils/images/rounded-images/image.component";
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";
import {TooltipComponent} from "../../utils/tooltip/tooltip.component";
import {GlobalHelper} from "../../../helpers/global.helper";
import {tooltipClasses} from "../../../utils/constants/global.constants";
import {SoftButtonComponent} from "../../utils/button/soft-button/soft-button.component";

@Component({
  selector: 'app-own-league-list',
  standalone: true,
  imports: [
    ImageComponent,
    CustomSolidButtonComponent,
    TooltipComponent,
    SoftButtonComponent
  ],
  templateUrl: './own-league-list.component.html',
})
export class OwnLeagueListComponent implements OnInit {
  constructor(
    private leagueApiService: LeagueApiService,
    private globalHelper: GlobalHelper,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.leagueApiService.getOwnLeagues().subscribe(this.handleLeagues);
  }

  leagues?: League[];

  handleLeagues = (leagues: League[]) => {
    this.leagues = leagues;
  }

  goToLeague = async (id: number | undefined) => {
    if (id === undefined) {
      throw new Error("ID de liga no existe");
    }

    await this.globalHelper.navigateFromRoot(`league/${id}`);
  };

  goToCreateLeague = () => {
     this.globalHelper.navigateFromRoot(`newleague`);
  };
  protected readonly tooltipClasses = tooltipClasses;
}
