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
import {ListenerSocketService} from "../../../services/socket/listener.socket.service";

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
  constructor(
    private leagueService: LeagueApiService,
    protected route: ActivatedRoute,
    protected router: Router,
    private socketListener: ListenerSocketService
  ) {}

  league?: League;
  leagueId?: number;
  subroute?: string;

  ngOnInit() {

    // Obteniendo el ID de la liga desde los parametros de la ruta.
    // Puede usarse route.snapshot como alternativa sin tener que suscribirse.
    this.route.paramMap.subscribe(params => {
      const id = params.get("leagueId");
      this.leagueId = Number(id) ?? null;
    })

    if (this.leagueId !== null && this.leagueId !== undefined) {
      this.leagueService.getLeague(this.leagueId).subscribe(res => this.handleLeague(res))
    }

    this.socketListener.leagueEdit(this.onSocketEdit)
  }

  // Botones para el panel de pestañas
  items: MenuItem[] = [
    {label: 'Inicio', routerLink: `overview`},
    {label: 'Campeonatos y eventos'},
    {label: 'Miembros', routerLink: 'members'},
    {label: 'Estadisticas'},
  ];

  private handleLeague = (res: League) => {
    console.log(this.league)
    this.league = res
  }

  private onSocketEdit = (id: number) => {
    this.leagueId = Number(id);
  }
}
