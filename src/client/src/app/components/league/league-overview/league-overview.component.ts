import { ActivatedRoute } from '@angular/router';
import { GlobalHelper } from './../../../helpers/global.helper';
import { Component } from '@angular/core';
import {LeagueSidebarComponent} from "../league-sidebar/league-sidebar.component";

@Component({
  selector: 'app-league-overview',
  standalone: true,
  imports: [
    LeagueSidebarComponent
  ],
  templateUrl: './league-overview.component.html',
  styleUrl: './league-overview.component.scss'
})
export class LeagueOverviewComponent {
  constructor(private globalHelper: GlobalHelper, private route: ActivatedRoute) {}

  createChampClick = () => {
    const leagueId = this.route.snapshot.paramMap.get('leagueId');

    // Con rutas relativas no detecta la ruta, ni tira un error.
    this.globalHelper.navigateFromRoot(`league/${leagueId}/championships/new`);
  }
}
