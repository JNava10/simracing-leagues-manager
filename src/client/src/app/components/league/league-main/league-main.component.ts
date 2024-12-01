import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {League} from "../../../utils/interfaces/league.interface";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {AsyncPipe, NgStyle} from "@angular/common";
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { LeagueNavbarComponent } from "../league-sidebar/league-navbar.component";
import {ImageComponent} from "../../utils/images/rounded-images/image.component";
import {LeagueMembersBarComponent} from "../league-members-bar/league-members-bar.component";

@Component({
  selector: 'app-league-main',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    TabMenuModule,
    LeagueNavbarComponent,
    ImageComponent,
    NgStyle,
    LeagueMembersBarComponent,
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
      this.leagueService.getLeague(this.leagueId).subscribe(this.handleLeague)
    }
  }

  league!: League;
  leagueId?: number;
  subroute?: string;

  // Botones para el panel de pestañas
  items: MenuItem[] = [
    {label: 'Inicio', routerLink: `overview`},
    {label: 'Campeonatos y eventos'},
    {label: 'Miembros', routerLink: 'members'},
    {label: 'Estadisticas'},
  ];
  private handleLeague = (res: League) => {
    this.league = res
  }
}
