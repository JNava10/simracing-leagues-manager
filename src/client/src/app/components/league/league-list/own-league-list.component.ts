import { Component, OnInit} from '@angular/core';
import {League} from "../../../utils/interfaces/league.interface";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {Router} from "@angular/router";
import {ImageComponent} from "../../utils/images/rounded-images/image.component";
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";
import {TooltipComponent} from "../../utils/tooltip/tooltip.component";
import {GlobalHelper} from "../../../helpers/global.helper";
import {tooltipClasses} from "../../../utils/constants/global.constants";
import {SoftButtonComponent} from "../../utils/button/soft-button/soft-button.component";
import {AuthData} from "../../../utils/interfaces/auth.interface";
import {AuthApiService} from "../../../services/api/auth-api.service";

@Component({
  selector: 'app-own-league-list',
  standalone: true,
  imports: [
    ImageComponent,
    TooltipComponent,
    SoftButtonComponent
  ],
  templateUrl: './own-league-list.component.html',
})
export class OwnLeagueListComponent implements OnInit {
  constructor(
    private leagueApiService: LeagueApiService,
    protected globalHelper: GlobalHelper,
    private router: Router,
    protected authService: AuthApiService
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

  getProfileRoute = () => {
    return `profile/${this.globalHelper.getUserId()}`
  };

  logout = () => {
    this.authService.logout().subscribe(this.handleLogout);
  };

  private handleLogout = (res: AuthData) => {
    if (res.auth) throw new Error('No se ha podido cerrar sesión correctamente')

    this.globalHelper.removeTokens()

    this.globalHelper.navigateFromRoot("login")
  }

  protected readonly tooltipClasses = tooltipClasses;
}
