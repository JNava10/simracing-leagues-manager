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

export const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full' },
  { path: 'lm', children: [
      { path: 'login', component: LoginComponent },
      { path: 'newleague', component: CreateLeagueFormComponent },
      { path: 'presets', component: PresetListComponent },
      { path: 'leagues', component: LeaguesDashboardComponent, title: 'Ligas' },
      { path: 'league/:leagueId', title: 'Informacion de la liga', component: LeagueMainComponent, children: [
        { path: '', redirectTo: 'overview', pathMatch: 'full' },
        { path: 'overview', component: LeagueOverviewComponent },
        { path: 'members', component: LeagueMemberListComponent },
        { path: 'pending', component: PendingMembersListComponent },
        { path: 'championships', children: [
          { component: CreateChampionshipComponent, title: 'Crear un campeonato', path: 'new' },
          { component: EnterChampionshipFormComponent, title: 'Entrar a un campeonato', path: ':champId/enter' },
          { component: ChampionshipResultsComponent, title: 'Resultados de un campeonato', path: ':champId/results' },
          { component: ChampionshipInfoComponent, title: 'Informacion de campeonato', path: ':champId' },
        ]},
      ]
    },
  ]},
];
