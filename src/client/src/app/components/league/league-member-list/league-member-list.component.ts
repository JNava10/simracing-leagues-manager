import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { LeagueApiService } from '../../../services/api/league-api.service';
import { ListenerSocketService } from '../../../services/socket/listener.socket.service';
import { GlobalHelper } from '../../../helpers/global.helper';
import {
  QueryIsExecuted,
  LeagueMember,
  LeagueMemberRequest,
  BanMemberRequest
} from '../../../utils/interfaces/league.interface';
import { User } from '../../../utils/interfaces/user.interface';
import {
  CustomSolidButtonComponent
} from '../../utils/button/solid-button/custom-solid-button.component';
import {
  SearchUsersBarComponent
} from '../../utils/custom/search/search-users-bar/search-users-bar.component';
import {
  BaseCustomInputComponent
} from '../../utils/custom/input/base-custom-input/base-custom-input.component';
import {
  CustomTextInputComponent
} from '../../utils/custom/input/custom-text-input/custom-text-input.component';

@Component({
  selector: 'app-league-member-list',
  providers: [

  ],
  standalone: true,
  imports: [
    ButtonModule,
    ToolbarModule,
    ListboxModule,
    FormsModule,
    MessagesModule,
    DatePipe,
    CustomSolidButtonComponent,
    DialogModule,
    SearchUsersBarComponent,
    CustomTextInputComponent,
  ],
  templateUrl: './league-member-list.component.html',
  styleUrl: './league-member-list.component.scss'
})
export class LeagueMemberListComponent implements OnInit {

  leagueId?: number;
  members: Map<number, LeagueMember> = new Map();
  searching = false;
  banning = false;
  banConfirm = false;
  banReason = "";
  memberToBan?: LeagueMember;

  constructor(
    private leagueService: LeagueApiService,
    private route: ActivatedRoute,
    private globalHelper: GlobalHelper,
    private socketListener: ListenerSocketService
  ) {}

  ngOnInit(): void {
    this.leagueId = this.route.snapshot.parent?.params['leagueId'];
    this.refreshList();
    this.socketListener.leagueMemberAdded(this.handleMemberAdded);
  }

  private refreshList(): void {
    this.leagueService.getMembers(this.leagueId!).subscribe(this.handleMembers);
  }

  private handleMembers = (res: LeagueMember[]): void => {
    res.forEach(member => {
      this.addMember(member);
    });
  };

  private handleAddingMember = (memberIsAdded: QueryIsExecuted): void => {
    this.globalHelper.showSuccessMessage({ message: "Se ha añadido al miembro correctamente." });
    this.refreshList();
  };

  private handleBanningMember = (): void => {
    this.refreshList();
  };

  private handleMemberAdded = (id: number): void => {
    this.leagueService.getMemberById(this.leagueId!, id).subscribe(this.addMember);
  };

  kickMember(userId: number): void {
    const member: LeagueMemberRequest = {
      leagueId: this.leagueId!,
      userId
    };
    this.leagueService.kickMember(member).subscribe(this.handleAddingMember);
  }

  banMember(userId: number): void {
    if (!this.memberToBan) return;

    const member: BanMemberRequest = {
      leagueId: this.leagueId!,
      userId: this.memberToBan.user.id!,
      reason: this.banReason
    };
    this.leagueService.banMember(member).subscribe(this.handleBanningMember);
  }

  inviteUser(user: User): void {
    this.leagueService.inviteMember(this.leagueId!, user.id!).subscribe(res => {
      if (res.executed) this.searching = false;
    });
  }

  toggleSearch(show: boolean): void {
    this.searching = show;
  }

  showBanReason(member: LeagueMember): void {
    this.banning = true;
    this.banReason = "";
    this.memberToBan = member;
  }

  showBanConfirm(): void {
    this.banning = false;
    this.banConfirm = true;
  }

  isAdmin(): void {

  }

  private addMember = (member: LeagueMember) => {

    if (member.user && member.user.id) {
      this.members.set(member.user.id, member);
    }
  }
}
