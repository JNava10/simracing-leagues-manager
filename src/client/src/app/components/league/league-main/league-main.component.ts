import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {League} from "../../../utils/interfaces/league.interface";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-league-main',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterOutlet,
    TabMenuModule
  ],
  templateUrl: './league-main.component.html',
  styleUrl: './league-main.component.scss'
})
export class LeagueMainComponent implements OnInit {
  constructor(private leagueService: LeagueApiService, protected route: ActivatedRoute, protected router: Router) {}

  ngOnInit() {

    // Obteniendo el ID de la liga desde los parametros de la ruta.
    // Puede usarse route.snapshot como alternativa sin tener que suscribirse.
    this.route.paramMap.subscribe(params => {
      const id = params.get("leagueId");
      this.leagueId = Number(id) ?? null;
    })


    if (this.leagueId) {
      this.league$ = this.leagueService.getLeague(this.leagueId)
    }
  }

  league$!: Observable<League>;
  leagueId?: number;
  subroute?: string;

  // Botones para el panel de pestañas
  items: MenuItem[] = [
    {label: 'Inicio', routerLink: `overview`},
    {label: 'Campeonatos y eventos'},
    {label: 'Miembros', routerLink: 'members'},
    {label: 'Estadisticas'},
  ];
}
