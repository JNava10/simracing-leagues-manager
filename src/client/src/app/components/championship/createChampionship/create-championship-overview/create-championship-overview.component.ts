import { ScoreApiService } from './../../../../services/api/score-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { LeagueChampionship } from '../../../../utils/interfaces/championship.interface';
import { ButtonTheme, CustomButtonComponent } from "../../../utils/custom-button/custom-button.component";
import { NgStyle } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ChampionshipApiService } from '../../../../services/api/championship-api.service';
import { DefaultRes } from '../../../../utils/interfaces/responses/response.interface';
import { Observable } from 'rxjs';
import { GlobalHelper } from '../../../../helpers/global.helper';

@Component({
  selector: 'app-create-championship-overview',
  standalone: true,
  imports: [CustomButtonComponent, NgStyle, DialogModule],
  templateUrl: './create-championship-overview.component.html',
  styleUrl: './create-championship-overview.component.scss'
})
export class CreateChampionshipOverviewComponent implements OnInit {
  constructor(private championshipService: ChampionshipApiService, private globalHelper: GlobalHelper, private service: ScoreApiService) {}

  ngOnInit(): void {
    console.log(this.championship);
  }


  createdResponse$?: Observable<DefaultRes>

  buttonTheme = ButtonTheme;

  showingSummary = false;

  @Input() championship?: LeagueChampionship;

  showSummary() {
    this.showingSummary = true;
  }

  createChampionship() {
    this.championshipService.create(this.championship!)
      .subscribe(res => {
        this.afterCreatingChampionship(res)
      })
  }

  afterCreatingChampionship(res: DefaultRes<LeagueChampionship>) {
    this.globalHelper.navigateFromRoot(`league/${this.championship?.leagueId}/championships/${res.data?.id}`)
  }
}
