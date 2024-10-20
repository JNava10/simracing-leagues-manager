import { M } from '@angular/cdk/keycodes';
import { GlobalHelper } from '../../../helpers/global.helper';
import { League } from './../../../utils/interfaces/league.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-league-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './league-sidebar.component.html',
  styleUrl: './league-sidebar.component.scss'
})
export class LeagueSidebarComponent {
  constructor(private globalHelper: GlobalHelper) {}

  @Input() league?: League

  leagueRoutes = {
    overview: 'overview',
    members: 'members',
    pending: 'pending',
  }

  navigateIntoLeague(route: string) {
    this.globalHelper.navigateFromRoot(`league/${this.league?.id}/${route}`);
  }
}
