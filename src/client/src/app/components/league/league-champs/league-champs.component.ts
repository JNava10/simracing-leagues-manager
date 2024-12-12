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

  @Input() leagueId?: number

  ngOnInit(): void {
    // POST ENTREGA: Se ha cambiado la forma en la que se obtiene el ID de liga para cambios reactivos.
    this.route.paramMap.subscribe(params => {
      this.leagueId = +params.get('leagueId')! || 0;

      if (this.leagueId !== null && this.leagueId !== undefined && this.leagueId > 0) {
        this.leagueService.getChamps(this.leagueId).subscribe(res => this.handleChamps(res));
      }
    });
  }

  private handleChamps = (championships: LeagueChampionship[]) => {
    console.log(championships)
    this.championships = championships;
  }


  championships: LeagueChampionship[] = [];
}
