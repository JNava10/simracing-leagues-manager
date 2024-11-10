import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {LeagueChampionship, PositionCreation} from "../../utils/interfaces/championship.interface";
import {DefaultRes} from "../../utils/interfaces/responses/response.interface";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {catchError, throwError} from "rxjs";
import {User} from "../../utils/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  register = (user: User) => {
    return this.http.post<DefaultRes>(`${devEnv.apiEndpoint}/user/register`, user, {params: {...sendTokenParam}}).pipe(
      catchError((err: HttpResponse<DefaultRes>, caught) => {
        console.error('Error creating championship:', err);
        return throwError(() => new Error('Error creating championship, please try again later.'));
      })
    )
  }
}
