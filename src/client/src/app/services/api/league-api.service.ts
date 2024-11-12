import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { devEnv } from '../../../environments/environment.development';
import { QueryIsExecuted, League, LeagueMember, ApiMemberFilter } from '../../utils/interfaces/league.interface';
import { sendTokenParam } from '../../utils/constants/global.constants';
import { User } from '../../utils/interfaces/user.interface';
import { GlobalHelper } from '../../helpers/global.helper';
import { catchError, map } from 'rxjs/operators';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeagueApiService {
  constructor(private http: HttpClient) {
    this.globalHelper = inject(GlobalHelper);
  }

  private globalHelper?: GlobalHelper;

  createLeague = (league: League) => {
    const url = `${devEnv.apiEndpoint}/league`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<League>(url, league, options).pipe(
      catchError((err: HttpResponse<League>, caught) => {
        this.globalHelper!.handleApiError('Error al crear la liga:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  addMember = (newMemberData: ApiMemberFilter) => {
    const url = `${devEnv.apiEndpoint}/league/${newMemberData.leagueId}/member`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<QueryIsExecuted>(url, newMemberData, options).pipe(
      catchError((err: HttpResponse<QueryIsExecuted>, caught) => {
        this.globalHelper!.handleApiError('Error al agregar miembro a la liga:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  kickMember = ({ leagueId, userId }: ApiMemberFilter) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/member/${userId}`;
    const options = { params: { ...sendTokenParam } };

    return this.http.delete<QueryIsExecuted>(url, options).pipe(
      catchError((err: HttpResponse<QueryIsExecuted>, caught) => {
        this.globalHelper!.handleApiError('Error al expulsar miembro de la liga:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  getOwnLeagues = () => {
    const url = `${devEnv.apiEndpoint}/league/owned`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<League[]>(url, options).pipe(
      catchError((err: HttpResponse<League[]>, caught) => {
        this.globalHelper!.handleApiError('Error al obtener tus ligas:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  getLeague = (id: number) => {
    const url = `${devEnv.apiEndpoint}/league/${id}`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<League>(url, options).pipe(
      catchError((err: HttpResponse<League>, caught) => {
        this.globalHelper!.handleApiError('Error al obtener la liga:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  getLeagueMembers = (leagueId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/members`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<LeagueMember[]>(url, options).pipe(
      catchError((err: HttpResponse<LeagueMember[]>, caught) => {
        this.globalHelper!.handleApiError('Error al obtener los miembros de la liga:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  searchNotMembers = (leagueId: number, search: string) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/not-members`;
    const options = { params: { ...sendTokenParam, search } };

    return this.http.get<User[]>(url, options).pipe(
      catchError((err: HttpResponse<User[]>, caught) => {
        this.globalHelper!.handleApiError('Error al buscar no-miembros de la liga:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  searchLeagueByName = (search: string) => {
    const url = `${devEnv.apiEndpoint}/league/`;
    const options = { params: { ...sendTokenParam, name: search } };

    return this.http.get<League[]>(url, options).pipe(
      catchError((err: HttpResponse<League[]>, caught) => {
        this.globalHelper!.handleApiError('Error al buscar liga por nombre:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  sendEnterLeagueRequest = (leagueId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/enter/`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<QueryIsExecuted>(url, {}, options).pipe(
      catchError((err: HttpResponse<QueryIsExecuted>, caught) => {
        this.globalHelper!.handleApiError('Error al solicitar unirse a la liga:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  getPendingMembers = (leagueId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/pending/`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<User[]>(url, options).pipe(
      catchError((err: HttpResponse<User[]>, caught) => {
        this.globalHelper!.handleApiError('Error al obtener miembros pendientes:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  acceptPendingMember = (leagueId: number, userId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/pending/accept/`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<QueryIsExecuted>(url, { userId }, options).pipe(
      catchError((err: HttpResponse<QueryIsExecuted>, caught) => {
        this.globalHelper!.handleApiError('Error al aceptar miembro pendiente:', err);
        return caught;
      }),
      map(res => res)
    );
  }

  declinePendingMember = (leagueId: number, userId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/pending/decline/`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<QueryIsExecuted>(url, { userId }, options).pipe(
      catchError((err: HttpResponse<QueryIsExecuted>, caught) => {
        this.globalHelper!.handleApiError('Error al rechazar miembro pendiente:', err);
        return of();
      }),
      map(res => res)
    );
  }
}
