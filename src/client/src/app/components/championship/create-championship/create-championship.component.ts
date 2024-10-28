import { ChampionshipApiService } from './../../../services/api/championship-api.service';
import { ActivatedRoute } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { CreatingChampRoundStates } from '../../../utils/enums/states.enum';
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
  templateUrl: './create-championship.component.html',
  styleUrl: './create-championship.component.scss'
})
export class CreateChampionshipComponent implements OnInit {

  constructor(private route: ActivatedRoute, private championshipService: ChampionshipApiService) {}

  ngOnInit(): void {
    // En caso de que se utilize un ID de preset, se carga su informacion en el formulario
    const presetKey = 'presetId'
    const presetId = this.route.snapshot.queryParams[presetKey];

    if (presetId) {
      this.preset$ = this.championshipService.getPresetById(presetId)
    }
  }


  creatingStates = CreatingChampRoundStates; // Hay que crear una variable si queremos usar un enum en el HTML. De lo contrario no funcionará.

  currentCreatingState: CreatingChampRoundStates = CreatingChampRoundStates.CreatingBasicInfo; // Es mas sencillo manejar que se muestra en el modal cambiando su estado, en vez de ifs y booleans.

  championshipCreating?: LeagueChampionship;

  preset$?: Observable<DefaultRes<ChampionshipPreset>>;

  handleBasicDataCreated = (championship: LeagueChampionship) => {
    this.championshipCreating = championship;

    this.currentCreatingState = this.creatingStates.CreatingTeams;
  }

  handleTeamsCreated = (teams: Team[]) => {
    if (!this.championshipCreating) {
      return;
    }

    this.championshipCreating!.teams = teams;

    this.currentCreatingState = this.creatingStates.CreatingScoreSystem
  }

  handleScoreCreated = (scoreSystem: ScoreSystem) => {
    this.championshipCreating!.scoreSystem = scoreSystem;

    this.currentCreatingState = this.creatingStates.SharePresetConfig
  }

  handleAfterPresetShare = () => {
    this.currentCreatingState = this.creatingStates.Overview
  }
}
