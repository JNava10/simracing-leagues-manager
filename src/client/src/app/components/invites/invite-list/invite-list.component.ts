import {Component, Input} from '@angular/core';
import {LeagueInvite, QueryIsExecuted} from "../../../utils/interfaces/league.interface";
import {DatePipe} from "@angular/common";
import {CustomButtonComponent} from "../../utils/custom/input/custom-button/custom-button.component";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {IndexableMap} from "../../../utils/classes/IndexableMap";

@Component({
  selector: 'app-invite-list',
  standalone: true,
  imports: [
    DatePipe,
    CustomButtonComponent
  ],
  templateUrl: './invite-list.component.html',
  styleUrl: './invite-list.component.scss'
})
export class InviteListComponent {
  constructor(private leagueService: LeagueApiService) {}

  @Input() inviteList?: IndexableMap<LeagueInvite>

  acceptLeague(id: number) {
    this.leagueService.acceptInvite(id).subscribe(res => this.handleCreating(res, id))
  }

  private handleCreating = (res: QueryIsExecuted, id: number) => {
    if (res.executed) {
      const i = this.inviteList!.findIndex(item => item.league.id === id)
      this.inviteList!.delete(i)
    }
  }
}
