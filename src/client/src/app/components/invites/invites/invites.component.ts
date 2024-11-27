import {Component, OnInit} from '@angular/core';
import {LeagueApiService} from "../../../services/api/league-api.service";
import {LeagueInvite} from "../../../utils/interfaces/league.interface";
import {InviteListComponent} from "../invite-list/invite-list.component";
import {IndexableMap} from "../../../utils/classes/IndexableMap";

@Component({
  selector: 'app-invites',
  standalone: true,
  imports: [
    InviteListComponent
  ],
  templateUrl: './invites.component.html',
  styleUrl: './invites.component.scss'
})
export class InvitesComponent implements OnInit {
  constructor(private leagueService: LeagueApiService) {}

    ngOnInit(): void {
        this.leagueService.getInvites().subscribe(res => this.handleInvites(res))
    }

  private handleInvites = (res: LeagueInvite[]) => {
    this.invites = IndexableMap.fromArray(res)
  }

  protected invites?: IndexableMap<LeagueInvite>;
  protected readonly IndexableMap = IndexableMap;
}
