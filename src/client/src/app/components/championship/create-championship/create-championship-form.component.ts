import { GlobalHelper } from './../../../helpers/global.helper';
import { ChampionshipApiService } from './../../../services/api/championship-api.service';
import { ActivatedRoute } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { ChampFormStates } from '../../../utils/enums/states.enum';
import { BasicInfoChampionshipFormComponent } from "./basic-info-championship-form/basic-info-championship-form.component";
import { ChampionshipPreset, LeagueChampionship, Team } from '../../../utils/interfaces/championship.interface';
import { TeamFormComponent } from "./team-form/team-form.component";
import { ScoreSystemFormComponent } from "../createChampionship/score-system-form/score-system-form.component";
import { ScoreSystem } from '../../../utils/interfaces/score.interface';
import { CreateChampionshipOverviewComponent } from "../createChampionship/create-championship-overview/create-championship-overview.component";
import { ShareConfigPresetComponent } from "../createChampionship/share-config-preset/share-config-preset.component";
import { Observable } from 'rxjs';
import { DefaultRes } from '../../../utils/interfaces/responses/response.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create-championship',
  standalone: true,
  imports: [BasicInfoChampionshipFormComponent, TeamFormComponent, ScoreSystemFormComponent, CreateChampionshipOverviewComponent, ShareConfigPresetComponent, AsyncPipe],
  templateUrl: './create-championship-form.component.html',
})
export class CreateChampionshipFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private championshipService: ChampionshipApiService, private globalHelper: GlobalHelper) {}

  ngOnInit(): void {
    // En caso de que se utilize un ID de preset, se carga su informacion en el formulario

    const presetId = this.route.snapshot.queryParams['presetId'];
    const champId = this.route.snapshot.params['champId'];

    if (presetId) {
      this.getPresetIfExists(presetId);
    }
  }

  creatingStates = ChampFormStates; // Hay que crear una variable si queremos usar un enum en el HTML. De lo contrario no funcionará.
  currentCreatingState: ChampFormStates = ChampFormStates.BasicInfo; // Es mas sencillo manejar que se muestra en el modal cambiando su estado, en vez de ifs y booleans.
  championship?: LeagueChampionship;
  preset?: ChampionshipPreset;

  private getPresetIfExists(presetId: number) {
    this.championshipService.getPresetById(presetId).subscribe(res => this.preset = res!)
  }

  private getChampionship = (champId: number) => {
    this.championshipService.getByIdFull(champId).subscribe(res => this.championship = res!);
  }

  handleBasicDataCreated = (championship: LeagueChampionship) => {
    this.championship = championship;

    this.currentCreatingState = this.creatingStates.Teams;
  }

  handleTeamsCreated = (teams: Team[]) => {
    if (!this.championship) {
      return;
    }

    this.championship!.teams = teams;

    this.currentCreatingState = this.creatingStates.ScoreSystem
  }

  handleScoreCreated = (scoreSystem: ScoreSystem) => {
    this.championship!.scoreSystem = scoreSystem;

    this.currentCreatingState = this.creatingStates.SharePresetConfig
  }

  handleAfterPresetShare = () => {
    this.currentCreatingState = this.creatingStates.Overview
  }
}
