import {inject, Injectable} from '@angular/core';
import {League} from "../../utils/interfaces/league.interface";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {
  ChampionshipPreset,
  EnterChampionship,
  GetChampProps,
  LeagueChampionship,
  PositionCreation,
  Team
} from "../../utils/interfaces/championship.interface";
import { DefaultRes } from '../../utils/interfaces/responses/response.interface';
import { catchError, throwError } from 'rxjs';
import { GetTeam } from '../../utils/interfaces/responses/championship.responses';
import {GlobalHelper} from "../../helpers/global.helper";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChampionshipApiService {
  constructor(private http: HttpClient) { }

  private globalHelper = inject(GlobalHelper);

  create = (championship: LeagueChampionship) => {
    return this.http.post<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship`, championship, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error creating championship:', err);
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }

  saveRoundResults = (results: PositionCreation[], id: number) => {
    return this.http.post<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/results/1`, results, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error creating championship:', err);
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }

  getById = (id: number, props?: GetChampProps) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}`, {params: {...sendTokenParam, ...props}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error obteniendo campeonato:', err);
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }

  // TODO: Temporal
  getCalendarById =  (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/calendar`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error obteniendo campeonato:', err);
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }

  // TODO: Temporal
  getEntriesById = (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/entries`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error obteniendo campeonato:', err);
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }

  enter = (data: EnterChampionship, champId: number) => {
    return this.http.post<DefaultRes>(`${devEnv.apiEndpoint}/championship/${champId}/enter`, data, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error obteniendo campeonato:', err);
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }

  getTeams = (champId: number) => {
    return this.http.get<DefaultRes<GetTeam[]>>(`${devEnv.apiEndpoint}/championship/teams/${champId}`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error obteniendo campeonato:', err);
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }

  createPreset = (championship: LeagueChampionship) => {
    return this.http.post<DefaultRes>(`${devEnv.apiEndpoint}/championship/preset`, championship, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error creating preset:', err);
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }

  getAllPresets = () => {
    return this.http.get<DefaultRes<ChampionshipPreset[]>>(`${devEnv.apiEndpoint}/championship/preset`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error al obtener los presets:', err);
        return throwError(() => new Error('Error obteniendo los presets, prueba mas tarde.'));
      })
    )
  }

  getPresetById(presetId: any) {
    return this.http.get<DefaultRes<ChampionshipPreset>>(`${devEnv.apiEndpoint}/championship/preset/${presetId}`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error al obtener el presets:', err);
        return throwError(() => new Error('Error obteniendo el preset, prueba mas tarde.'));
      })
    )
  }
}
