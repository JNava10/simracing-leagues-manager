import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChampionshipApiService} from "../../../../services/api/championship-api.service";
import {GlobalHelper} from "../../../../helpers/global.helper";
import {CreatingEventStates} from "../../../../utils/enums/states.enum";
import {
  ChampionshipPreset,
  LeagueEvent,
  Team
} from "../../../../utils/interfaces/championship.interface";
import {
  CreateChampionshipOverviewComponent
} from "../../../championship/createChampionship/create-championship-overview/create-championship-overview.component";

import {
  ShareConfigPresetComponent
} from "../../../championship/createChampionship/share-config-preset/share-config-preset.component";
import {TeamFormComponent} from "../../../championship/create-championship/team-form/team-form.component";
import {BasicInfoEventFormComponent} from "../basic-info-event-form/basic-info-event-form.component";
import {EventOverviewComponent} from "../event-overview/event-overview.component";

@Component({
  selector: 'app-create-event-form',
  standalone: true,
  imports: [
    ShareConfigPresetComponent,
    TeamFormComponent,
    BasicInfoEventFormComponent,
    EventOverviewComponent
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private championshipService: ChampionshipApiService,
    private globalHelper: GlobalHelper
  ) {}

  ngOnInit(): void {
    // En caso de que se utilize un ID de preset, se carga su informacion en el formulario

    this.route.paramMap.subscribe(params => {
      const id = params.get("leagueId");
      this.leagueId = Number(id) ?? null;
    })

    const presetKey = 'presetId'
    const presetId = this.route.snapshot.queryParams[presetKey];

    if (presetId) {
      this.championshipService.getPresetById(presetId).subscribe(res => {
        this.preset = res!;
      })
    }
  }

  leagueId?: number;

  readonly creatingStates = CreatingEventStates;

  // Es mas sencillo manejar que se muestra en el modal cambiando su estado, en vez de ifs y booleans.
  currentCreatingState: CreatingEventStates = CreatingEventStates.CreatingBasicInfo;

  eventCreating?: LeagueEvent;
  preset?: ChampionshipPreset

  handleBasicDataCreated = (event: LeagueEvent) => {
    this.eventCreating = event;

    this.eventCreating.leagueId = this.leagueId;

    this.currentCreatingState = this.creatingStates.CreatingTeams;
  }

  handleTeamsCreated = (teams: Team[]) => {
    if (!this.eventCreating) {
      return;
    }

    this.eventCreating!.teams = teams;

    this.currentCreatingState = this.creatingStates.Overview;
  }

  handleAfterPresetShare = () => {
    this.currentCreatingState = this.creatingStates.Overview;
  }
}
