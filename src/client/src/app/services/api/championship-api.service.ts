import {inject, Injectable} from '@angular/core';
import {League} from "../../utils/interfaces/league.interface";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {
  ChampionshipPreset,
  EnterChampionship,
  GetChampProps,
  LeagueChampionship, Position,
  PositionCreation,
  Team
} from "../../utils/interfaces/championship.interface";
import { DefaultRes } from '../../utils/interfaces/responses/response.interface';
import {catchError, tap, throwError} from 'rxjs';
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
        return this.globalHelper.handleApiError('Error al crear el campeonato:', err);
      })
    )
  }

  saveRoundResults = (results: PositionCreation[], id: number) => {
    return this.http.post<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/results/1`, results, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al guardar los resultados de la ronda:', err);
      })
    )
  }

  getById = (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al obtener el campeonato:', err);
      })
    )
  }

  getByIdNew = (id: number) => {
    const url = `${devEnv.apiEndpoint}/championship/${id}`;
    const options = {params: {...sendTokenParam}};

    return this.http.get<DefaultRes<LeagueChampionship>>(url, options)
      .pipe(
        catchError((err: HttpResponse<DefaultRes>, caught) => {
          this.globalHelper.handleApiError('Error al obtener el campeonato:', err);
          return caught;
        }),

        map((res) => {
          return res.data!
        })
      )
  }

  getByIdFull = (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/full`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al obtener el campeonato completo:', err);
      })
    )
  }

  getResults = (id: number) => {
    return this.http.get<DefaultRes<PositionCreation[]>>(`${devEnv.apiEndpoint}/championship/${id}/results`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al obtener los resultados:', err);
      })
    )
  }

  getCalendarById =  (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/calendar`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al obtener el calendario del campeonato:', err);
      })
    )
  }

  getEntriesById = (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/entries`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al obtener las entradas del campeonato:', err);
      })
    )
  }

  enter = (data: EnterChampionship, champId: number) => {
    return this.http.post<DefaultRes>(`${devEnv.apiEndpoint}/championship/${champId}/enter`, data, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al inscribirse en el campeonato:', err);
      })
    )
  }

  getTeams = (champId: number) => {
    return this.http.get<DefaultRes<GetTeam[]>>(`${devEnv.apiEndpoint}/championship/teams/${champId}`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al obtener los equipos del campeonato:', err);
      })
    )
  }

  createPreset = (championship: LeagueChampionship) => {
    return this.http.post<DefaultRes>(`${devEnv.apiEndpoint}/championship/preset`, championship, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al crear el preset del campeonato:', err);
      })
    )
  }

  getAllPresets = () => {
    return this.http.get<DefaultRes<ChampionshipPreset[]>>(`${devEnv.apiEndpoint}/championship/preset`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al obtener los presets:', err);
      })
    )
  }

  getPresetById(presetId: any) {
    return this.http.get<DefaultRes<ChampionshipPreset>>(`${devEnv.apiEndpoint}/championship/preset/${presetId}`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        return this.globalHelper.handleApiError('Error al obtener el preset:', err);
      })
    )
  }
}
