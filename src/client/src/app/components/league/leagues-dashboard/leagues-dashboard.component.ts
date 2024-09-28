import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {League} from "../../../utils/interfaces/league.interface";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {AsyncPipe} from "@angular/common";
import {ListboxModule} from "primeng/listbox";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import { SearchLeaguesBarComponent } from "../search-leagues-bar/search-leagues-bar.component";
// import {BrowseLeaguesListComponent} from "../browse-leagues-list/browse-leagues-list.component";
@Component({
  selector: 'app-leagues-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    ListboxModule,
    RouterLink,
    TableModule,
    SearchLeaguesBarComponent
],
  templateUrl: './leagues-dashboard.component.html',
  styleUrl: './leagues-dashboard.component.scss'
})
export class LeaguesDashboardComponent implements OnInit {
  leagues$!: Observable<League[]>

  constructor(private leagueService: LeagueApiService, protected route: ActivatedRoute) {}

  ngOnInit(): void {
    this.leagues$ = this.leagueService.getOwnLeagues();
  }
}
