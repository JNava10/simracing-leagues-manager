import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
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
    return this.http.post<League>(`${environment.apiEndpoint}/league`, league, {params: {...sendTokenParam}})
  }

  addMember = (newMemberData: ApiMemberFilter) => {
    return this.http.post<QueryIsExecuted>(`${environment.apiEndpoint}/league/${newMemberData.leagueId}/member`, newMemberData, {params: {...sendTokenParam}})
  }

  kickMember = ({leagueId, userId}: ApiMemberFilter) => {
    return this.http.delete<QueryIsExecuted>(`${environment.apiEndpoint}/league/${leagueId}/member/${userId}`, {params: {...sendTokenParam}});
  }

  getOwnLeagues = () => {
    return this.http.get<League[]>(`${environment.apiEndpoint}/league/owned`, {params: {...sendTokenParam}})
  }

  getLeague = (id: number) => {
    return this.http.get<League>(`${environment.apiEndpoint}/league/${id}`, {params: {...sendTokenParam}}).pipe(
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
    return this.http.get<LeagueMember[]>(`${environment.apiEndpoint}/league/${leagueId}/members`, {params: {...sendTokenParam}})
  }

  searchNotMembers = (leagueId: number, search: string) => {
    return this.http.get<User[]>(`${environment.apiEndpoint}/league/${leagueId}/not-members`, {params: {...sendTokenParam, search}})
  }

  searchLeagueByName = (search: string) => {
    return this.http.get<League[]>(`${environment.apiEndpoint}/league/`, {params: {...sendTokenParam, name: search}})
  }

  sendEnterLeagueRequest = (leagueId: number) => {
    return this.http.post<QueryIsExecuted>(`${environment.apiEndpoint}/league/${leagueId}/enter/`, {}, {params: {...sendTokenParam}})
  }

  getPendingMembers = (leagueId: number) => {
    return this.http.get<User[]>(`${environment.apiEndpoint}/league/${leagueId}/pending/`, {params: {...sendTokenParam}})
  }

  acceptPendingMember = (leagueId: number, userId: number) => {
    return this.http.post<QueryIsExecuted>(`${environment.apiEndpoint}/league/${leagueId}/pending/accept/`, {userId}, {params: {...sendTokenParam}})
  }

  declinePendingMember = (leagueId: number, userId: number) => {
    return this.http.post<QueryIsExecuted>(`${environment.apiEndpoint}/league/${leagueId}/pending/decline/`, {userId}, {params: {...sendTokenParam}})
  }
}
