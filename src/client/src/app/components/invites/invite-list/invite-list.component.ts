import {Component, Input} from '@angular/core';
import {LeagueInvite} from "../../../utils/interfaces/league.interface";
import {DatePipe} from "@angular/common";
import {CustomButtonComponent} from "../../utils/custom/input/custom-button/custom-button.component";
import {LeagueApiService} from "../../../services/api/league-api.service";

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

  @Input() inviteList?: LeagueInvite[]

  acceptLeague(id: number) {
    this.leagueService.acceptInvite(id).subscribe()
  }
}
