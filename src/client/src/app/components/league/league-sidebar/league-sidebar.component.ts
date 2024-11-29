import { M } from '@angular/cdk/keycodes';
import { GlobalHelper } from '../../../helpers/global.helper';
import { League } from './../../../utils/interfaces/league.interface';
import {Component, Input, OnInit} from '@angular/core';
import {LoginComponent} from "../../auth/login/login.component";
import {NgStyle} from "@angular/common";
import {devEnv} from "../../../../environments/environment.development";

@Component({
  selector: 'app-league-sidebar',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './league-sidebar.component.html',
  styleUrl: './league-sidebar.component.scss'
})
export class LeagueSidebarComponent implements OnInit {
  constructor(protected globalHelper: GlobalHelper) {}

  ngOnInit(): void {
    console.log(this.league)
    this.globalHelper.showSuccessMessage({title: 'ss', message: 'aaa'})

  }

  @Input() league?:League;

  leagueRoutes = {
    overview: 'overview',
    members: 'members',
    pending: 'pending',
  }

  navigateInLeague(route: string) {
    this.globalHelper.navigateFromRoot(`league/${this.league?.id}/${route}`);
  }

  protected readonly devEnv = devEnv;
}
