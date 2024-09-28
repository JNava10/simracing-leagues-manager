import { Component, OnInit } from '@angular/core';
import { LeagueApiService } from '../../../services/api/league-api.service';
import { Observable } from 'rxjs';
import { User } from '../../../utils/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { QueryIsExecuted } from '../../../utils/interfaces/league.interface';
import { GlobalHelper } from '../../../helpers/global.helper';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pending-members-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pending-members-list.component.html',
  styleUrl: './pending-members-list.component.css'
})
export class PendingMembersListComponent implements OnInit {
  constructor(
    private leagueService: LeagueApiService,
    private activatedRoute: ActivatedRoute,
    private globalHelper: GlobalHelper,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.leagueId = this.activatedRoute.snapshot.parent!.params['leagueId'];
    this.pendingList$ = this.leagueService.getPendingMembers(this.leagueId!);
  }

  pendingList$?: Observable<User[]>
  leagueId?: number

  acceptMember = (user: User) => {
    console.log(user);
    
    this.leagueService.acceptPendingMember(this.leagueId!, user.id!).subscribe(this.handleAcceptingMember)
  }

  declineUser = (user: User) => {
    this.leagueService.declinePendingMember(this.leagueId!, user.id!).subscribe(this.handleDecliningMember)
  } 

  handleAcceptingMember = (data: QueryIsExecuted) => {
    if (data.executed) {
      this.globalHelper.showSuccessMessage('Exito', data.msg, this.messageService)
    } else {
      this.globalHelper.showErrorMessage('Error', data.msg, this.messageService)
    }
    
    this.pendingList$ = this.leagueService.getPendingMembers(this.leagueId!);

  }

  handleDecliningMember = (data: QueryIsExecuted) => {
    if (data.executed) {
      this.globalHelper.showSuccessMessage('Exito', data.msg, this.messageService)
    } else {
      this.globalHelper.showErrorMessage('Error', data.msg, this.messageService)
    }

    this.pendingList$ = this.leagueService.getPendingMembers(this.leagueId!);
  }
}
