import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {DefaultRes} from "../../../../utils/interfaces/responses/response.interface";
import {LeagueChampionship, LeagueEvent} from "../../../../utils/interfaces/championship.interface";
import {ChampionshipApiService} from "../../../../services/api/championship-api.service";
import {GlobalHelper} from "../../../../helpers/global.helper";
import {ScoreApiService} from "../../../../services/api/score-api.service";
import {EventApiService} from "../../../../services/api/event-api.service";
import {CustomButtonComponent} from "../../../utils/custom-button/custom-button.component";
import {CustomCardComponent} from "../../../utils/custom/custom-card/custom-card.component";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-event-overview',
  standalone: true,
  imports: [
    CustomButtonComponent,
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
    this.eventService.create(this.event?.leagueId!, this.event!)
      .subscribe(res => this.afterCreatingEvent(res!));
  }

  afterCreatingEvent(res: LeagueEvent) {
    this.globalHelper.navigateFromRoot(`league/${this.event?.leagueId}/event/${res.id}`)
  }
}
