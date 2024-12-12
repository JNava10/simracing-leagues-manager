import { GlobalHelper } from './../../../helpers/global.helper';
import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {League} from "../../../utils/interfaces/league.interface";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {AsyncPipe} from "@angular/common";
import {ListboxModule} from "primeng/listbox";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import { SearchLeaguesBarComponent } from "../search-leagues-bar/search-leagues-bar.component";
import { CustomSolidButtonComponent } from "../../utils/button/solid-button/custom-solid-button.component";
import {CustomDropdownComponent} from "../../utils/dropdown/custom-dropdown/custom-dropdown.component";
import {CustomDropdownItemComponent} from "../../utils/dropdown/custom-dropdown-item/custom-dropdown-item.component";
import {CustomEmptyComponent} from "../../utils/custom/custom-empty/custom-empty.component";
import {ImageComponent} from "../../utils/images/rounded-images/image.component";
import {BaselineCarSearchComponent} from "../../utils/search/baseline-car-search/baseline-car-search.component";
import {DialogModule} from "primeng/dialog";
import {SoftButtonComponent} from "../../utils/button/soft-button/soft-button.component";
// import {BrowseLeaguesListComponent} from "../browse-leagues-list/browse-leagues-list.component";
@Component({
  selector: 'app-leagues-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    ListboxModule,
    TableModule,
    SearchLeaguesBarComponent,
    CustomEmptyComponent,
    ImageComponent,
    BaselineCarSearchComponent,
    DialogModule,
    SoftButtonComponent
  ],
  templateUrl: './leagues-dashboard.component.html',
  styleUrl: './leagues-dashboard.component.scss'
})
export class LeaguesDashboardComponent implements OnInit {

  leagues?: League[]

  constructor(private leagueService: LeagueApiService, protected route: ActivatedRoute, private globalHelper: GlobalHelper) {}

  ngOnInit(): void {
    this.leagueService.getAllLeagues(0).subscribe(this.handleLeagues);
  }

  navigateToCreate() {
    this.globalHelper.navigateFromRoot('newleague')
  }

  private handleLeagues = (res: League[]) => {
    this.leagues = res;
  }
  searchingLeagues = false;

  showSearch = () => {
    this.searchingLeagues = true;
  };
}
