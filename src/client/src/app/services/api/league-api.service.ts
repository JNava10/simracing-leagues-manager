import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { devEnv } from '../../../environments/environment.development';
import {
  QueryIsExecuted,
  League,
  LeagueMember,
  LeagueMemberRequest,
  BanMemberRequest
} from '../../utils/interfaces/league.interface';
import { sendTokenParam } from '../../utils/constants/global.constants';
import { User } from '../../utils/interfaces/user.interface';
import { GlobalHelper } from '../../helpers/global.helper';
import { catchError, map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {DefaultRes} from "../../utils/interfaces/responses/response.interface";

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

    return this.http.post<DefaultRes<League>>(url, league, options).pipe(
      catchError((res: HttpResponse<DefaultRes<League>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res, caught);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<League>(res)!;
      })
    );
  }

  addMember = (newMemberData: LeagueMemberRequest) => {
    const url = `${devEnv.apiEndpoint}/league/${newMemberData.leagueId}/member`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<QueryIsExecuted>>(url, newMemberData, options).pipe(
      catchError((res: HttpResponse<DefaultRes<QueryIsExecuted>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res, caught);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => res.data!)
    );
  }

  kickMember = ({ leagueId, userId }: LeagueMemberRequest) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/kick/${userId}`;
    const options = { params: { ...sendTokenParam } };

    return this.http.delete<DefaultRes<QueryIsExecuted>>(url, options).pipe(
      catchError((res: HttpResponse<DefaultRes<QueryIsExecuted>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res, caught);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => res.data!)
    );
  }

  banMember = ({ leagueId, userId, reason }: BanMemberRequest) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/ban/${userId}`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<QueryIsExecuted>>(url, {reason}, options).pipe(
      catchError((res: HttpResponse<DefaultRes<QueryIsExecuted>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res, caught);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<QueryIsExecuted>(res)!;
      })
    );
  }

  getOwnLeagues = () => {
    const url = `${devEnv.apiEndpoint}/league/owned`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<DefaultRes<League[]>>(url, options).pipe(
      catchError((err: HttpResponse<DefaultRes<League[]>>, caught) => {
        this.globalHelper!.handleApiError('Error al obtener tus ligas:', err, caught);
        return caught;
      }),
      map((res) => res.data!)
    );
  }

  getLeague = (id: number) => {
    const url = `${devEnv.apiEndpoint}/league/${id}`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<DefaultRes<League>>(url, options).pipe(
      catchError((err: HttpResponse<DefaultRes<League>>, caught) => {
        this.globalHelper!.handleApiError('Error al obtener la liga:', err, caught);
        return caught;
      }),
      map((res) => res.data!)
    );
  }

  getLeagueMembers = (leagueId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/members`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<DefaultRes<LeagueMember[]>>(url, options).pipe(
      catchError((err: HttpResponse<DefaultRes<LeagueMember[]>>, caught) => {
        this.globalHelper!.handleApiError('Error al obtener los miembros de la liga:', err, caught);
        return caught;
      }),
      map((res) => res.data!)
    );
  }

  searchNotMembers = (leagueId: number, search: string) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/not-members`;
    const options = { params: { ...sendTokenParam, search } };

    return this.http.get<DefaultRes<User[]>>(url, options).pipe(
      catchError((err: HttpResponse<DefaultRes<User[]>>, caught) => {
        this.globalHelper!.handleApiError('Error al buscar no-miembros de la liga:', err, caught);
        return caught;
      }),
      map((res) => res.data!)
    );
  }

  searchLeagueByName = (search: string) => {
    const url = `${devEnv.apiEndpoint}/league/`;
    const options = { params: { ...sendTokenParam, name: search } };

    return this.http.get<DefaultRes<League[]>>(url, options).pipe(
      catchError((err: HttpResponse<DefaultRes<League[]>>, caught) => {
        this.globalHelper!.handleApiError('Error al buscar liga por nombre:', err, caught);
        return caught;
      }),
      map((res) => res.data!)
    );
  }

  sendEnterLeagueRequest = (leagueId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/enter/`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<QueryIsExecuted>>(url, {}, options).pipe(
      catchError((err: HttpResponse<DefaultRes<QueryIsExecuted>>, caught) => {
        this.globalHelper!.handleApiError('Error al solicitar unirse a la liga:', err, caught);
        return caught;
      }),
      map((res) => res.data!)
    );
  }

  getPendingMembers = (leagueId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/pending/`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<DefaultRes<User[]>>(url, options).pipe(
      catchError((err: HttpResponse<DefaultRes<User[]>>, caught) => {
        this.globalHelper!.handleApiError('Error al obtener miembros pendientes:', err, caught);
        return caught;
      }),
      map((res) => res.data!)
    );
  }

  acceptPendingMember = (leagueId: number, userId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/pending/accept/`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<QueryIsExecuted>>(url, { userId }, options).pipe(
      catchError((err: HttpResponse<DefaultRes<QueryIsExecuted>>, caught) => {
        this.globalHelper!.handleApiError('Error al aceptar miembro pendiente:', err, caught);
        return caught;
      }),
      map((res) => res.data!)
    );
  }

  declinePendingMember = (leagueId: number, userId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/pending/decline/`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<QueryIsExecuted>>(url, { userId }, options).pipe(
      catchError((res: HttpResponse<DefaultRes<QueryIsExecuted>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res, caught);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),

      map((res) => res.data!)
    );
  }

  inviteMember = (leagueId: number, userId: number) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}/invite/${userId}`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<QueryIsExecuted>>(url, { userId }, options).pipe(
      catchError((res: HttpResponse<DefaultRes<QueryIsExecuted>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res, caught);

        if (error instanceof Observable) {
          return error
        } else {
          return of(error)
        }
      }),

      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<QueryIsExecuted>(res)!;
      })
    );
  }

  editLeague = (leagueId: number, data: League) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}`;
    const options = { params: { ...sendTokenParam } };

    return this.http.put<DefaultRes<League>>(url, data, options).pipe(
      catchError((res: HttpResponse<DefaultRes<League>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res, caught);

        if (error instanceof Observable) {
          return error
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return res.data!
      })
    );
  }
}
