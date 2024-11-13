import { Component, Input, OnInit } from '@angular/core';
import { LeagueApiService } from '../../../services/api/league-api.service';
import { ActivatedRoute } from '@angular/router';
import {async, Observable, of} from 'rxjs';
import { QueryIsExecuted, LeagueMember, ApiMemberFilter } from '../../../utils/interfaces/league.interface';
import { TableModule } from 'primeng/table';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { User } from '../../../utils/interfaces/user.interface';
import { ListboxClickEvent, ListboxFilterEvent, ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { GlobalHelper } from '../../../helpers/global.helper';
import { MessagesModule } from 'primeng/messages';
import {CustomTableComponent, TableColumn} from "../../utils/custom-table/custom-table.component";
import {CustomButtonComponent} from "../../utils/custom-button/custom-button.component";
import {DialogModule} from "primeng/dialog";
import {SearchLeaguesBarComponent} from "../search-leagues-bar/search-leagues-bar.component";
import {SearchUsersBarComponent} from "../../utils/custom/search/search-users-bar/search-users-bar.component";

@Component({
  selector: 'app-league-member-list',
  standalone: true,
  imports: [AsyncPipe, ButtonModule, ToolbarModule, ListboxModule, FormsModule, MessagesModule, DatePipe, CustomButtonComponent, DialogModule, SearchLeaguesBarComponent, SearchUsersBarComponent],
  templateUrl: './league-member-list.component.html',
  styleUrl: './league-member-list.component.scss'
})
export class LeagueMemberListComponent implements OnInit {
  constructor(
    private leagueService: LeagueApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private globalHelper: GlobalHelper
  ) {}

  ngOnInit(): void {
    if (!this.leagueId) this.leagueId = this.route.snapshot.parent?.params['leagueId'];
    this.$members = this.leagueService.getLeagueMembers(this.leagueId!);
  }

  leagueId?: number
  selectedUser?: User

  $members?: Observable<LeagueMember[]>
  $elegibleUsers?: Observable<User[]>
  $search?: Observable<User[]>

  searchTimeout?: any;
  protected searching = false;

  handleSearch = (originalEvent: ListboxFilterEvent) => {
    const value = String(originalEvent.filter);

    if (value == "") this.$elegibleUsers = of(); // of() crea un nuevo observable vacio.

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => this.searchUsers(value), 500);
  }

  searchUsers = (search: string) => {
    this.$elegibleUsers = this.leagueService.searchNotMembers(this.leagueId!, search)
  }

  selectUser = ($event: ListboxClickEvent) => {
    const selectedUser = $event.option as User;

    const newMemberData: ApiMemberFilter = {
      leagueId: this.leagueId!,
      userId: selectedUser.id!
    }

    this.leagueService.addMember(newMemberData).subscribe(this.handleAddingMember);
  }

  handleAddingMember = (memberIsAdded: QueryIsExecuted) => {
    this.globalHelper.showSuccessMessage("Exito", memberIsAdded.msg, this.messageService);

    this.$members = this.leagueService.getLeagueMembers(this.leagueId!); // TODO: Cambiar esta chapuza.
  }

  kickMember = (userId: number) => {
    const newMemberData: ApiMemberFilter = {
      leagueId: this.leagueId!,
      userId
    }

    this.leagueService.kickMember(newMemberData).subscribe(this.handleAddingMember);
  }

  handleKickingMember = (memberIsAdded: QueryIsExecuted) => {
    this.globalHelper.showSuccessMessage("Exito", memberIsAdded.msg, this.messageService);

    this.$members = this.leagueService.getLeagueMembers(this.leagueId!); // TODO: Cambiar esta chapuza.
  }

  toggleSearch = (show: boolean) => {
    this.searching = show;
  }
}

