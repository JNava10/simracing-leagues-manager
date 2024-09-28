import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../../../utils/interfaces/league.interface';
import { FormsModule } from '@angular/forms';
import { PickListModule } from 'primeng/picklist';
import {AsyncPipe} from "@angular/common";
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-browse-leagues-list',
  standalone: true,
  imports: [FormsModule, PickListModule, AsyncPipe, DialogModule],
  templateUrl: './browse-leagues-list.component.html',
  styleUrl: './browse-leagues-list.component.scss'
})
export class BrowseLeaguesListComponent {

  constructor() {

  }

  searching = false

  showResultList = () => {
    this.searching = true;
    console.log(this.searching);

  }

  hideResultList = () => {
    this.searching = false;
    console.log(this.searching);
  }

  search = ""
  searchedLeagues$?: Observable<League[]>
  recommendedLeagues$?: Observable<League[]>

  openSearchModal = () => {

  }
}
