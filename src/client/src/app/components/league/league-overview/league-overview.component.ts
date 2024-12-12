import {ActivatedRoute, Router} from '@angular/router';
import { GlobalHelper } from './../../../helpers/global.helper';
import {Component, OnInit} from '@angular/core';
import {LeagueNavbarComponent} from "../league-sidebar/league-navbar.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-league-overview',
  standalone: true,
  templateUrl: './league-overview.component.html',
  styleUrl: './league-overview.component.scss'
})
export class LeagueOverviewComponent {
  constructor(private globalHelper: GlobalHelper, private route: ActivatedRoute) { }


  createChampClick = () => {
    const leagueId = this.route.snapshot.paramMap.get('leagueId');

    this.globalHelper.navigateFromRoot(`league/${leagueId}/championships/new`);
  }
}
