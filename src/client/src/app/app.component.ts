import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { Router, Event, NavigationEnd } from '@angular/router';

import { IStaticMethods } from 'preline/preline';
import {NavbarComponent} from "./components/utils/custom-navbar/navbar.component";
import {MessageModule} from "primeng/message";
import {GlobalHelper} from "./helpers/global.helper";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, NavbarComponent],
  providers: [MessageModule, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

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
