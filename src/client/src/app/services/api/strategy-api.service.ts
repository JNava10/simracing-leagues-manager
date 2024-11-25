import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {ScoreSystem} from "../../utils/interfaces/score.interface";
import {DefaultRes} from "../../utils/interfaces/responses/response.interface";
import {League} from "../../utils/interfaces/league.interface";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {GlobalHelper} from "../../helpers/global.helper";

@Injectable({
  providedIn: 'root'
})
export class StrategyApiService {

  constructor(private http: HttpClient, private globalHelper: GlobalHelper) { }

  getStrategies = () => {
    const url = `${devEnv.apiEndpoint}/strategy`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<StrategyApiService[]>>(url, {}, options).pipe(
      catchError((res: HttpResponse<DefaultRes<StrategyApiService[]>>, caught) => {
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
