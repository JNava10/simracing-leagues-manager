import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-league-admin-panel',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './league-admin-panel.component.html',
  styleUrl: './league-admin-panel.component.scss'
})
export class LeagueAdminPanelComponent {

}
