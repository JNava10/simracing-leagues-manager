import { Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {CreateLeagueFormComponent} from "./components/league/create/create-league-form/create-league-form.component";
import {LeaguesDashboardComponent} from "./components/league/leagues-dashboard/leagues-dashboard.component";
import {LeagueMainComponent} from "./components/league/league-main/league-main.component";
import {LeagueOverviewComponent} from "./components/league/league-overview/league-overview.component";
import {CreateChampionshipComponent} from "./components/championship/create-championship/create-championship.component";
import { LeagueMemberListComponent } from './components/league/league-member-list/league-member-list.component';
import { PendingMembersListComponent } from './components/league/pending-members-list/pending-members-list.component';
import { PresetListComponent } from './components/presets/preset-list/preset-list.component';
import { ChampionshipInfoComponent } from './components/championship/championship-info/championship-info.component';
import { EnterChampionshipFormComponent } from './components/championship/enter-championship-form/enter-championship-form.component';
import { ChampionshipResultsComponent } from './components/championship/championship-results/championship-results.component';
import {LeagueAdminPanelComponent} from "./components/league/admin/league-admin-panel/league-admin-panel.component";
import {EditLeagueFormComponent} from "./components/league/admin/edit-league-form/edit-league-form.component";
import {
  RoundResultFormComponent
} from "./components/championship/results/round-result-form/round-result-form.component";
import {RegisterFormComponent} from "./components/register/register-form/register-form.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'lm', children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterFormComponent },
      { path: 'newleague', component: CreateLeagueFormComponent },
      { path: 'presets', component: PresetListComponent },
      { path: 'leagues', title: 'Ligas', component: LeaguesDashboardComponent },
      { path: 'league/:leagueId', title: 'Informacion de la liga', component: LeagueMainComponent, children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview', component: LeagueOverviewComponent },
          { path: 'admin', component: LeagueAdminPanelComponent, children: [
              { path: 'members', component: LeagueMemberListComponent },
              { path: 'members', component: LeagueMemberListComponent, title: 'Miembros de liga' },
              { path: 'pending', component: PendingMembersListComponent, title: 'Miembros pendientes de entrar a liga' },
            ]},
          { path: 'championships', children: [
              { path: 'new', title: 'Crear un campeonato', component: CreateChampionshipComponent },
              { path: ':champId/enter', title: 'Entrar a un campeonato', component: EnterChampionshipFormComponent },
              { path: ':champId/results', title: 'Resultados de un campeonato', component: ChampionshipResultsComponent },
              { path: ':champId/results/:round', title: 'Resultados de un campeonato', component: RoundResultFormComponent },
              { path: ':champId', title: 'Informacion de campeonato', component: ChampionshipInfoComponent },
            ]},
        ]
      },
    ]},
];
