import { M } from '@angular/cdk/keycodes';
import { GlobalHelper } from '../../../helpers/global.helper';
import { League } from './../../../utils/interfaces/league.interface';
import {Component, Input, OnInit} from '@angular/core';
import {LoginComponent} from "../../auth/login/login.component";

@Component({
  selector: 'app-league-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './league-sidebar.component.html',
  styleUrl: './league-sidebar.component.scss'
})
export class LeagueSidebarComponent implements OnInit {
  constructor(protected globalHelper: GlobalHelper) {}

  ngOnInit(): void {
    console.log(this.league)
  }

  @Input() league?:League;

  leagueRoutes = {
    overview: 'overview',
    members: 'members',
    pending: 'pending',
  }

  navigateInAdmin(route: string) {
    this.globalHelper.navigateFromRoot(`league/${this.league?.id}/admin/${route}`);
  }
}
