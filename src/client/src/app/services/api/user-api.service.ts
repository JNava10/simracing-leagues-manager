import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {LeagueChampionship, PositionCreation} from "../../utils/interfaces/championship.interface";
import {DefaultRes} from "../../utils/interfaces/responses/response.interface";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {catchError, throwError} from "rxjs";
import {User} from "../../utils/interfaces/user.interface";
import {League} from "../../utils/interfaces/league.interface";
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
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }

  searchByNick = (search: string) => {
    const url = `${devEnv.apiEndpoint}/user/search/nick/${search}`;
    const options = { params: { ...sendTokenParam, name: search } };

    return this.http.get<DefaultRes<User[]>>(url, options).pipe(
      catchError((err: HttpResponse<DefaultRes<User[]>>, caught) => {
        this.globalHelper!.handleApiError('Error al buscar usuarios por nombre:', err, caught);
        return caught;
      }),
      map((res) => res.data!)
    );
  }

}
