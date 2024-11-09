import { Component, Input, OnInit } from '@angular/core';
import { LeagueChampionship } from '../../../utils/interfaces/championship.interface';
import { ChampionshipApiService } from '../../../services/api/championship-api.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {GlobalHelper} from "../../../helpers/global.helper";

@Component({
  selector: 'app-championship-info',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './championship-info.component.html',
  styleUrl: './championship-info.component.scss'
})
export class ChampionshipInfoComponent implements OnInit {

  constructor(private championshipService: ChampionshipApiService, private activatedRoute: ActivatedRoute, protected globalHelper: GlobalHelper) {}

  ngOnInit(): void {
    const champId = this.activatedRoute.snapshot.params['champId'];

    this.championshipService.getById(champId).subscribe(res => this.handleChampionship(res.data))
  }

  handleChampionship(data: LeagueChampionship | undefined): void {
    this.championship = data;
  }

  championship?: LeagueChampionship;
}
