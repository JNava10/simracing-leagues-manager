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
import {BaselineCar, CreateStrategyProps, SearchCarProps, Strategy} from "../../utils/interfaces/strategy.interface";
import {SearchTrackProps} from "../../utils/interfaces/track.interface";

@Injectable({
  providedIn: 'root'
})
export class StrategyApiService {

  constructor(private http: HttpClient, private globalHelper: GlobalHelper) { }

  getStrategy = (data: CreateStrategyProps) => {
    const url = `${devEnv.apiEndpoint}/strategy`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<StrategyApiService[]>>(url, data, options).pipe(
      catchError((res: HttpResponse<DefaultRes<StrategyApiService[]>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

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

  calculateStrategy = (strategy: CreateStrategyProps) => {
    const url = `${devEnv.apiEndpoint}/strategy`;
    const options = { params: { ...sendTokenParam } };

    return this.http.post<DefaultRes<StrategyApiService[]>>(url, {}, options).pipe(
      catchError((res: HttpResponse<DefaultRes<StrategyApiService[]>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

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

  searchCars = (props: SearchCarProps) => {
    const url = `${devEnv.apiEndpoint}/strategy/car/search`;
    const options = { params: { ...sendTokenParam }, ...props };

    return this.http.get<DefaultRes<BaselineCar[]>>(url, options).pipe(
      catchError((res: HttpResponse<DefaultRes<BaselineCar[]>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

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
