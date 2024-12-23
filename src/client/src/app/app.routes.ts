import { Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {CreateLeagueFormComponent} from "./components/league/create/create-league-form/create-league-form.component";
import {LeaguesDashboardComponent} from "./components/league/leagues-dashboard/leagues-dashboard.component";
import {LeagueMainComponent} from "./components/league/league-main/league-main.component";
import {LeagueOverviewComponent} from "./components/league/league-overview/league-overview.component";
import {CreateChampionshipFormComponent} from "./components/championship/create-championship/create-championship-form.component";
import { LeagueMemberListComponent } from './components/league/league-member-list/league-member-list.component';
import { PendingMembersListComponent } from './components/league/pending-members-list/pending-members-list.component';
import { PresetListComponent } from './components/presets/preset-list/preset-list.component';
import { ChampionshipInfoComponent } from './components/championship/championship-info/championship-info.component';
import { EnterChampionshipFormComponent } from './components/championship/enter-championship-form/enter-championship-form.component';
import { ChampionshipResultsComponent } from './components/championship/championship-results/championship-results.component';
import {LeagueAdminPanelComponent} from "./components/league/admin/league-admin-panel/league-admin-panel.component";
import {
  RoundResultFormComponent
} from "./components/championship/results/round-result-form/round-result-form.component";
import {RegisterFormComponent} from "./components/register/register-form/register-form.component";
import {NotificationMenuComponent} from "./components/notifications/notification-menu/notification-menu.component";
import {EditLeagueFormComponent} from "./components/league/edit-league-form/edit-league-form.component";
import {CreateEventComponent} from "./components/league/event/create-event-form/create-event.component";
import {ProfileInfoComponent} from "./components/profile/profile-info/profile-info.component";
import {
  EditChampionshipFormComponent
} from "./components/championship/edit-championship/edit-championship-form.component";
import {
  DefineStrategiesFormComponent
} from "./components/strategy/define-strategies-form/define-strategies-form.component";
import {InvitesComponent} from "./components/invites/invites/invites.component";
import {LeagueChampsComponent} from "./components/league/league-champs/league-champs.component";
import {NotAuthComponent} from "./components/not-auth/not-auth.component";
import {hasSessionGuard} from "./guards/has-session.guard";
import {NotFoundPageComponent} from "./components/not-found-page/not-found-page.component";
import {isChampMember} from "./guards/is-champ-member";
import {LandingComponent} from "./components/landing/landing.component";

export const routes: Routes = [
  { path: '', redirectTo: 'lm/landing', pathMatch: 'full' },
  { path: 'lm', canActivate: [hasSessionGuard], children: [
      { path: 'profile/:userId', component: ProfileInfoComponent, },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterFormComponent },
      { path: 'newleague', component: CreateLeagueFormComponent },
      { path: 'invites', component: InvitesComponent },
      { path: 'presets', component: PresetListComponent},
      { path: 'landing', component: LandingComponent},
      { path: 'not-auth', component: NotAuthComponent },
      { path: 'leagues', title: 'Ligas', component: LeaguesDashboardComponent },
      { path: 'strategy', title: 'Estrategias', component: DefineStrategiesFormComponent },
      { path: 'strategy/create', title: 'Estrategias', component: DefineStrategiesFormComponent },
      { path: 'notifications', title: 'Notificaciones', component: NotificationMenuComponent },
      { path: 'league/:leagueId', title: 'Informacion de la liga', component: LeagueMainComponent, children: [
          { path: '', redirectTo: 'championships', pathMatch: 'full' },
          { path: 'overview', component: LeagueOverviewComponent },
          { path: 'members', component: LeagueOverviewComponent },
          { path: 'admin', component: LeagueAdminPanelComponent, children: [
              { path: 'edit', component: EditLeagueFormComponent, title: 'Editar info. de liga' },
              { path: 'members', component: LeagueMemberListComponent, title: 'Miembros de liga' },
              { path: 'pending', component: PendingMembersListComponent, title: 'Miembros pendientes de entrar a liga' },
            ]},
          { path: 'championships', children: [
              { path: '', component: LeagueChampsComponent },
              { path: 'new', title: 'Crear un campeonato', component: CreateChampionshipFormComponent },
              { path: ':champId/edit', title: 'Editar un campeonato', canActivate: [isChampMember], component: EditChampionshipFormComponent },
              { path: ':champId/enter', title: 'Entrar a un campeonato', component: EnterChampionshipFormComponent },
              { path: ':champId/results', title: 'Resultados de un campeonato', canActivate: [isChampMember], component: ChampionshipResultsComponent },
              { path: ':champId/results/:round', title: 'Resultados de un campeonato', canActivate: [isChampMember], component: RoundResultFormComponent },
              { path: ':champId', title: 'Informacion de campeonato', canActivate: [isChampMember], component: ChampionshipInfoComponent },
            ]
          },

          {
            path: 'events', children: [
              { path: 'new', title: 'Crear un evento', component: CreateEventComponent },
            ]
          },
        ]
      },

      { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
    ]},
];
