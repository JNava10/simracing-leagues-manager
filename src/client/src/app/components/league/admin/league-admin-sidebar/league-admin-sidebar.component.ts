import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalHelper} from "../../../../helpers/global.helper";
import {League} from "../../../../utils/interfaces/league.interface";

@Component({
  selector: 'app-league-admin-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './league-admin-sidebar.component.html',
  styleUrl: './league-admin-sidebar.component.scss'
})
export class LeagueAdminSidebarComponent {
  constructor(private globalHelper: GlobalHelper) { }

   @Input() league?: League

  navigateInAdmin(route: string) {
    this.globalHelper.navigateFromRoot(`league/${this.league?.id}/admin/${route}`);
  }

}
