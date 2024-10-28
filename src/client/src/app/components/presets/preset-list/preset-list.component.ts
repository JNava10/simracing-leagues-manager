import { ChampionshipPreset } from './../../../utils/interfaces/championship.interface';
import { LeagueApiService } from './../../../services/api/league-api.service';
import { GlobalHelper } from './../../../helpers/global.helper';
import { Component, OnInit } from '@angular/core';
import { ChampionshipApiService } from '../../../services/api/championship-api.service';
import { Observable } from 'rxjs';
import { CustomButtonComponent } from "../../utils/custom-button/custom-button.component";
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { League } from '../../../utils/interfaces/league.interface';

@Component({
  selector: 'app-preset-list',
  standalone: true,
  imports: [CustomButtonComponent, DialogModule],
  templateUrl: './preset-list.component.html',
  styleUrl: './preset-list.component.scss'
})
export class PresetListComponent implements OnInit {
  constructor(
    private championshipService: ChampionshipApiService,
    private globalHelper: GlobalHelper,
    private leagueService: LeagueApiService,
  ) {}

  presets?: ChampionshipPreset[]
  presetSelected?: ChampionshipPreset;

  ngOnInit(): void {
    this.championshipService.getAllPresets().subscribe(res => {
      this.presets = res.data;
    })
  }

  selectPreset(preset: ChampionshipPreset) {
    this.selectLeagueShowing = true;
    this.presetSelected = preset;

    this.leagueService.getOwnLeagues().subscribe(res => this.handleGetLeagues(res))
  }

  handleGetLeagues(res: League[]): void {
    this.leaguesToSelect = res
  }

  closeModal() {
    this.selectLeagueShowing = false
  }

  protected createChampionshipWithPreset(leagueId: number, presetId: number) {
    this.globalHelper.navigateFromRoot(`league/${leagueId}/championships/new`, {presetId})
  }

  protected goToCreateLeague() {
    this.globalHelper.navigateFromRoot('newleague')
  }

  protected leaguesToSelect?: League[];
  protected selectLeagueShowing = false;
}
