import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChampionshipApiService} from "../../../services/api/championship-api.service";
import {GlobalHelper} from "../../../helpers/global.helper";
import {ChampFormStates} from "../../../utils/enums/states.enum";
import {ChampionshipPreset, LeagueChampionship, Team} from "../../../utils/interfaces/championship.interface";
import {Observable} from "rxjs";
import {DefaultRes} from "../../../utils/interfaces/responses/response.interface";
import {ScoreSystem} from "../../../utils/interfaces/score.interface";
import {
  BasicInfoChampionshipFormComponent
} from "../create-championship/basic-info-championship-form/basic-info-championship-form.component";
import {
  CreateChampionshipOverviewComponent
} from "../createChampionship/create-championship-overview/create-championship-overview.component";
import {ScoreSystemFormComponent} from "../createChampionship/score-system-form/score-system-form.component";
import {ShareConfigPresetComponent} from "../createChampionship/share-config-preset/share-config-preset.component";
import {TeamFormComponent} from "../create-championship/team-form/team-form.component";
import {ChampEditOverviewComponent} from "../champ-edit-overview/champ-edit-overview.component";

@Component({
  selector: 'app-edit-championship-form',
  standalone: true,
  imports: [
    BasicInfoChampionshipFormComponent,
    CreateChampionshipOverviewComponent,
    ScoreSystemFormComponent,
    ShareConfigPresetComponent,
    TeamFormComponent,
    ChampEditOverviewComponent
  ],
  templateUrl: './edit-championship-form.component.html',
})
export class EditChampionshipFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private championshipService: ChampionshipApiService, private globalHelper: GlobalHelper) {}

  ngOnInit(): void {
    const champId = this.route.snapshot.params['champId'];

    if (champId) {
      this.getChampionship(+champId);
    }

    // En caso de que se utilize un ID de preset, se carga su informacion en el formulario
    const presetKey = 'presetId'
    const presetId = this.route.snapshot.queryParams[presetKey];

    if (presetId) {
      this.championshipService.getPresetById(presetId).subscribe(res => {
        this.preset = res!;
      })
    }
  }


  creatingStates = ChampFormStates; // Hay que crear una variable si queremos usar un enum en el HTML. De lo contrario no funcionará.
  currentCreatingState: ChampFormStates = ChampFormStates.BasicInfo; // Es mas sencillo manejar que se muestra en el modal cambiando su estado, en vez de ifs y booleans.
  championship?: LeagueChampionship;
  preset?: ChampionshipPreset

  private getChampionship = (champId: number) => {
    this.championshipService.getByIdFull(champId).subscribe(res => this.championship = res!);
  }

  handleBasicDataCreated = (championship: LeagueChampionship) => {
    this.championship = {
      ...championship,
      teams: this.championship!.teams!,
    };

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
