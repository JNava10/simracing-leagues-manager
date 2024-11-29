import {Component, Input, OnInit} from '@angular/core';
import {LeagueChampionship} from "../../../utils/interfaces/championship.interface";
import {League} from "../../../utils/interfaces/league.interface";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChampListComponent} from "../champ-list/champ-list.component";

@Component({
  selector: 'app-league-champs',
  standalone: true,
  imports: [
    ChampListComponent
  ],
  templateUrl: './league-champs.component.html',
  styleUrl: './league-champs.component.scss'
})
export class LeagueChampsComponent implements OnInit {
  constructor(private leagueService: LeagueApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let leagueId = this.route.snapshot.params['leagueId'];
    this.leagueService.getChamps(leagueId).subscribe(res => this.handleChamps(res));
  }

  private handleChamps = (championships: LeagueChampionship[]) => {
    console.log(championships)
    this.championships = championships;
  }


  championships: LeagueChampionship[] = [];
}
