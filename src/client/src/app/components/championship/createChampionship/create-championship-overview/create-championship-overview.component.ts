import { ScoreApiService } from './../../../../services/api/score-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { LeagueChampionship } from '../../../../utils/interfaces/championship.interface';
import { CustomSolidButtonComponent } from "../../../utils/button/solid-button/custom-solid-button.component";
import { NgStyle } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ChampionshipApiService } from '../../../../services/api/championship-api.service';
import { DefaultRes } from '../../../../utils/interfaces/responses/response.interface';
import { Observable } from 'rxjs';
import { GlobalHelper } from '../../../../helpers/global.helper';

@Component({
  selector: 'app-championship-overview',
  standalone: true,
  imports: [CustomSolidButtonComponent, NgStyle, DialogModule],
  templateUrl: './championship-overview.component.html',
  styleUrl: './championship-overview.component.scss'
})
export class CreateChampionshipOverviewComponent implements OnInit {
  constructor(private championshipService: ChampionshipApiService, private globalHelper: GlobalHelper, private service: ScoreApiService) {}

  ngOnInit(): void {
    console.log(this.championship);
  }

  @Input() championship?: LeagueChampionship;

  createChampionship() {
    this.championshipService.create(this.championship!)
      .subscribe(res => {
        this.afterCreatingChampionship(res)
      })
  }

  afterCreatingChampionship(champId: number) {
    this.globalHelper.navigateFromRoot(`league/${this.championship?.leagueId}/championships/${champId}/enter`)
  }
}
