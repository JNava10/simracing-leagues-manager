import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {DefaultRes} from "../../../../utils/interfaces/responses/response.interface";
import {LeagueChampionship, LeagueEvent} from "../../../../utils/interfaces/championship.interface";
import {ChampionshipApiService} from "../../../../services/api/championship-api.service";
import {GlobalHelper} from "../../../../helpers/global.helper";
import {ScoreApiService} from "../../../../services/api/score-api.service";
import {EventApiService} from "../../../../services/api/event-api.service";
import {CustomSolidButtonComponent} from "../../../utils/button/solid-button/custom-solid-button.component";
import {CustomCardComponent} from "../../../utils/custom/custom-card/custom-card.component";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-event-overview',
  standalone: true,
  imports: [
    CustomSolidButtonComponent,
    CustomCardComponent,
    NgStyle
  ],
  templateUrl: './event-overview.component.html',
  styleUrl: './event-overview.component.scss'
})
export class EventOverviewComponent {
  constructor(private eventService: EventApiService, private globalHelper: GlobalHelper) {}

  @Input() event?: LeagueEvent;

  createEvent() {

    if (!this.event) throw new Error("No se ha encontrado ningun evento.");

    this.event.layout = undefined;

    this.eventService.create(this.event!)
      .subscribe(res => this.afterCreatingEvent(res!));
  }

  afterCreatingEvent(res: LeagueEvent) {
    this.globalHelper.navigateFromRoot(`league/${this.event?.leagueId}/event/${res.id}`)
  }
}
