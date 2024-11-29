import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {LeagueChampionship, PositionCreation} from "../../utils/interfaces/championship.interface";
import {DefaultRes} from "../../utils/interfaces/responses/response.interface";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {catchError, Observable, of, throwError} from "rxjs";
import {User} from "../../utils/interfaces/user.interface";
import {BanMemberRequest, League, QueryIsExecuted} from "../../utils/interfaces/league.interface";
import {map} from "rxjs/operators";
import {GlobalHelper} from "../../helpers/global.helper";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient, private globalHelper: GlobalHelper) { }

  register = (user: User) => {
    return this.http.post<DefaultRes>(`${devEnv.apiEndpoint}/user/register`, user, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error creating championship:', err);
        return caught
      })
    )
  }

  searchByNick = (search: string) => {
    const url = `${devEnv.apiEndpoint}/user/search/nick/${search}`;
    const options = { params: { ...sendTokenParam, name: search } };

    return this.http.get<DefaultRes<User[]>>(url, options).pipe(
      catchError((res: HttpResponse<DefaultRes<User[]>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);
        if (error instanceof Observable) {
          return error;
        } else {
          error.data = [];

          return of(error)
        }
      }),

      map((res) => res.data!)
    );
  }

  getById = (userId: number) => {
    const url = `${devEnv.apiEndpoint}/user/${userId}`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<DefaultRes<User>>(url, options).pipe(
      catchError((res: HttpResponse<DefaultRes<User>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<User>(res)!;
      })
    );
  }

}
