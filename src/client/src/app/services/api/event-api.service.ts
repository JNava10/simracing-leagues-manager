import { Injectable } from '@angular/core';
import {League} from "../../utils/interfaces/league.interface";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {LeagueChampionship, LeagueEvent} from "../../utils/interfaces/championship.interface";
import {DefaultRes} from "../../utils/interfaces/responses/response.interface";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {GlobalHelper} from "../../helpers/global.helper";

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  constructor(private http: HttpClient, private globalHelper: GlobalHelper) { }

  create = (leagueId: number, event: LeagueEvent) => {
    const url = `${devEnv.apiEndpoint}/league/${leagueId}`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<League>>(url, event, options).pipe(
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
