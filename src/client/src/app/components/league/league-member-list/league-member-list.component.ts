import { Component, OnInit } from '@angular/core';
import { LeagueApiService } from '../../../services/api/league-api.service';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import {
  QueryIsExecuted,
  LeagueMember,
  LeagueMemberRequest,
  BanMemberRequest
} from '../../../utils/interfaces/league.interface';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { User } from '../../../utils/interfaces/user.interface';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { GlobalHelper } from '../../../helpers/global.helper';
import { MessagesModule } from 'primeng/messages';
import {CustomButtonComponent} from "../../utils/custom-button/custom-button.component";
import {DialogModule} from "primeng/dialog";
import {SearchUsersBarComponent} from "../../utils/custom/search/search-users-bar/search-users-bar.component";
import {BaseCustomInputComponent} from "../../utils/base-custom-input/base-custom-input.component";
import {CustomTextInputComponent} from "../../utils/custom-text-input/custom-text-input.component";

@Component({
  selector: 'app-league-member-list',
  standalone: true,
  imports: [AsyncPipe, ButtonModule, ToolbarModule, ListboxModule, FormsModule, MessagesModule, DatePipe, CustomButtonComponent, DialogModule, SearchUsersBarComponent, CustomTextInputComponent],
  templateUrl: './league-member-list.component.html',
  styleUrl: './league-member-list.component.scss'
})
export class  LeagueMemberListComponent implements OnInit {
  constructor(
    private leagueService: LeagueApiService,
    private route: ActivatedRoute,
    private globalHelper: GlobalHelper
  ) {}

  ngOnInit(): void {
    if (!this.leagueId) this.leagueId = this.route.snapshot.parent?.params['leagueId'];

    this.refreshList();
  }

  leagueId?: number
  $members?: Observable<LeagueMember[]>
  protected searching = false;

  handleAddingMember = (memberIsAdded: QueryIsExecuted) => {
    this.globalHelper?.showSuccessMessage({message: "Se ha añadido al miembro correctamente."})

    this.$members = this.leagueService.getLeagueMembers(this.leagueId!); // TODO: Cambiar esta chapuza.
  }

  kickMember = (userId: number) => {
    const member: LeagueMemberRequest = {
      leagueId: this.leagueId!,
      userId
    }

    this.leagueService.kickMember(member).subscribe(this.handleAddingMember);
  }

  banMember = (userId: number) => {
    if (!this.memberToBan) return;

    const member: BanMemberRequest = {
      leagueId: this.leagueId!,
      userId: this.memberToBan!.user.id!,
      reason: this.banReason
    }

    this.leagueService.banMember(member).subscribe(this.handleBanningMember);
  }

  handleKickingMember = () => {
    this.refreshList();
  }

  private refreshList() {
    this.$members = this.leagueService.getLeagueMembers(this.leagueId!); // TODO: Cambiar esta chapuza.
  }

  toggleSearch = (show: boolean) => {
    this.searching = show;
  }

  inviteUser(user: User) {
    this.leagueService.inviteMember(this.leagueId!, user.id!).subscribe((res) => {})
  }

  private handleInvitingMember(res: QueryIsExecuted) {

  }

  private handleBanningMember = () => {
    this.refreshList();
  }

  showBanReason = (member: LeagueMember) => {
    this.banning = true;
    this.banReason = "";
    this.memberToBan = member;
  }

  showBanConfirm = () => {
    this.banning = false;
    this.banConfirm = true;
  }

  banReason = "";
  banning = false;
  banConfirm = false;
  memberToBan?: LeagueMember;
}

