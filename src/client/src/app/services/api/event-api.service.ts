import { Injectable } from '@angular/core';
import {League, LeagueMember} from "../../utils/interfaces/league.interface";
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

  create = (event: LeagueEvent) => {
    const url = `${devEnv.apiEndpoint}/event`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<LeagueEvent>>(url, event, options).pipe(
      catchError((res: HttpResponse<DefaultRes<LeagueEvent>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<LeagueEvent>(res)!;
      })
    );
  }
}
