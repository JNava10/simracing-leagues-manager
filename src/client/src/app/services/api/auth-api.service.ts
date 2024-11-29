import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {devEnv} from "../../../environments/environment.development";
import {catchError, Observable, of} from "rxjs";
import {AuthData, LoggedData, LoginData} from '../../utils/interfaces/auth.interface';
import {DefaultRes} from "../../utils/interfaces/responses/response.interface";
import {LeagueChampionship} from "../../utils/interfaces/championship.interface";
import {map} from "rxjs/operators";
import {GlobalHelper} from "../../helpers/global.helper";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpClient, private globalHelper: GlobalHelper) { }

  login = (loginData: LoginData) => {
    return this.http.post<LoggedData>(`${devEnv.apiEndpoint}/auth/login`, loginData).pipe(
      catchError((res: HttpErrorResponse) => {
        const error = res.error as LoggedData;

        return of(error);
      })
    )
  }

  isAuth = () => {
    return this.http.get<DefaultRes<AuthData>>(`${devEnv.apiEndpoint}/auth/`).pipe(
      catchError((res: HttpResponse<DefaultRes<AuthData>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error
        } else {
          return of(error)
        }
      }),
      map((res) => {
        return this.globalHelper!.handleDefaultData<AuthData>(res)!;
      })
    )
  }
}
