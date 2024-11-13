import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {LeagueSidebarComponent} from "../../league-sidebar/league-sidebar.component";
import { League } from '../../../../utils/interfaces/league.interface';
import {ChampionshipApiService} from "../../../../services/api/championship-api.service";
import {Observable} from "rxjs";
import {LeagueChampionship} from "../../../../utils/interfaces/championship.interface";
import {AsyncPipe} from "@angular/common";
import {LeagueApiService} from "../../../../services/api/league-api.service";

@Component({
  selector: 'app-league-admin-panel',
  standalone: true,
  imports: [
    RouterOutlet,
    LeagueSidebarComponent,
    AsyncPipe
  ],
  templateUrl: './league-admin-panel.component.html',
  styleUrl: './league-admin-panel.component.scss'
})
export class LeagueAdminPanelComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueApiService
  ) {}

  ngOnInit(): void {
    this.leagueId = this.route.snapshot.params['leagueId'];

    // this.league =
    this.leagueService.getLeague(this.leagueId!).subscribe(league => this.league = league);
  }



  league?: League;
  leagueId?: number;
}
