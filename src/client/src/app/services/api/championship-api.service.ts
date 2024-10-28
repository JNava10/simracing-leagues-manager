import { Injectable } from '@angular/core';
import {League} from "../../utils/interfaces/league.interface";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ChampionshipPreset, LeagueChampionship} from "../../utils/interfaces/championship.interface";
import { DefaultRes } from '../../utils/interfaces/responses/response.interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipApiService {
  constructor(private http: HttpClient) { }

  createChampionship = (championship: LeagueChampionship) => {
    return this.http.post<DefaultRes>(`${devEnv.apiEndpoint}/championship`, championship, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error creating championship:', err);
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
