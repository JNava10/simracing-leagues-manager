import { Component, Input, OnInit } from '@angular/core';
import { LeagueChampionship } from '../../../utils/interfaces/championship.interface';
import { ChampionshipApiService } from '../../../services/api/championship-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-championship-info',
  standalone: true,
  imports: [],
  templateUrl: './championship-info.component.html',
  styleUrl: './championship-info.component.scss'
})
export class ChampionshipInfoComponent implements OnInit {

  constructor(private championshipService: ChampionshipApiService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const champId = this.activatedRoute.snapshot.params['champId'];

    this.championshipService.getById(champId).subscribe(res => this.handleChampionship(res.data))
  }

  handleChampionship(data: LeagueChampionship | undefined): void {
    this.championship = data;

    console.log(data)
  }

  championship?: LeagueChampionship;
}
