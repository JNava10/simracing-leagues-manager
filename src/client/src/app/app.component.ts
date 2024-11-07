import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { Router, Event, NavigationEnd } from '@angular/router';

import { IStaticMethods } from 'preline/preline';
import {CustomNavbarComponent} from "./components/utils/custom/custom-navbar/custom-navbar.component";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, CustomNavbarComponent],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  title = 'leagueManagerClient';

  // ngOnInit() {
  //   this.router.events.subscribe((event: Event) => {
  //     if (event instanceof NavigationEnd) {
  //       setTimeout(() => {
  //         window.HSStaticMethods.autoInit();
  //       }, 100);
  //     }
  //   });
  // }
}
