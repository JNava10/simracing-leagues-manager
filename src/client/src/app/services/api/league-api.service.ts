import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {devEnv} from "../../../environments/environment.development";
import {QueryIsExecuted, League, LeagueMember, ApiMemberFilter} from "../../utils/interfaces/league.interface";
import {sendTokenParam} from "../../utils/constants/global.constants";
import { User } from '../../utils/interfaces/user.interface';
import { GlobalHelper } from '../../helpers/global.helper';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueApiService {

  constructor(private http: HttpClient) {
    this.globalHelper = inject(GlobalHelper);
  }

  private globalHelper?: GlobalHelper

  createLeague = (league: League) => {
    return this.http.post<League>(`${devEnv.apiEndpoint}/league`, league, {params: {...sendTokenParam}})
  }

  addMember = (newMemberData: ApiMemberFilter) => {
    return this.http.post<QueryIsExecuted>(`${devEnv.apiEndpoint}/league/${newMemberData.leagueId}/member`, newMemberData, {params: {...sendTokenParam}})
  }

  kickMember = ({leagueId, userId}: ApiMemberFilter) => {
    return this.http.delete<QueryIsExecuted>(`${devEnv.apiEndpoint}/league/${leagueId}/member/${userId}`, {params: {...sendTokenParam}});
  }

  getOwnLeagues = () => {
    return this.http.get<League[]>(`${devEnv.apiEndpoint}/league/owned`, {params: {...sendTokenParam}})
  }

  getLeague = (id: number) => {
    return this.http.get<League>(`${devEnv.apiEndpoint}/league/${id}`, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<League>, caught) => {
          console.log('a')
          if (err.status === 0)  {
          console.log('a')
          this.globalHelper!.showErrorMessage('No se ha podido conectar con el servidor', 'Comprueba si tienes conexión a internet')
        }

        return caught;
      })
    )
  }

  getLeagueMembers = (leagueId: number) => {
    return this.http.get<LeagueMember[]>(`${devEnv.apiEndpoint}/league/${leagueId}/members`, {params: {...sendTokenParam}})
  }

  searchNotMembers = (leagueId: number, search: string) => {
    return this.http.get<User[]>(`${devEnv.apiEndpoint}/league/${leagueId}/not-members`, {params: {...sendTokenParam, search}})
  }

  searchLeagueByName = (search: string) => {
    return this.http.get<League[]>(`${devEnv.apiEndpoint}/league/`, {params: {...sendTokenParam, name: search}})
  }

  sendEnterLeagueRequest = (leagueId: number) => {
    return this.http.post<QueryIsExecuted>(`${devEnv.apiEndpoint}/league/${leagueId}/enter/`, {}, {params: {...sendTokenParam}})
  }

  getPendingMembers = (leagueId: number) => {
    return this.http.get<User[]>(`${devEnv.apiEndpoint}/league/${leagueId}/pending/`, {params: {...sendTokenParam}})
  }

  acceptPendingMember = (leagueId: number, userId: number) => {
    return this.http.post<QueryIsExecuted>(`${devEnv.apiEndpoint}/league/${leagueId}/pending/accept/`, {userId}, {params: {...sendTokenParam}})
  }

  declinePendingMember = (leagueId: number, userId: number) => {
    return this.http.post<QueryIsExecuted>(`${devEnv.apiEndpoint}/league/${leagueId}/pending/decline/`, {userId}, {params: {...sendTokenParam}})
  }
}
