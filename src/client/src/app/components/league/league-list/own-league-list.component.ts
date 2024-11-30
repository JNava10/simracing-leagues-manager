import {Component, OnInit} from '@angular/core';
import {League} from "../../../utils/interfaces/league.interface";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-own-league-list',
  standalone: true,
  imports: [],
  templateUrl: './own-league-list.component.html',
})
export class OwnLeagueListComponent implements OnInit {
  constructor(private leagueApiService: LeagueApiService, private router: Router) { }

  ngOnInit(): void {
    this.leagueApiService.getOwnLeagues().subscribe(this.handleLeagues);
  }

  leagues?: League[];

  handleLeagues = (leagues: League[]) => {
    this.leagues = leagues;
  }
}
