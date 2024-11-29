import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {devEnv} from "../../../environments/environment.development";
import {League} from "../../utils/interfaces/league.interface";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {ScoreSystem} from "../../utils/interfaces/score.interface";
import {SearchTrackProps, StrategyLayout, Track, TrackLayout} from "../../utils/interfaces/track.interface";
import { DefaultRes } from '../../utils/interfaces/responses/response.interface';
import {catchError, Observable, of} from 'rxjs';
import {BaselineCar} from "../../utils/interfaces/strategy.interface";
import {map} from "rxjs/operators";
import {GlobalHelper} from "../../helpers/global.helper";
import {LeagueChampionship} from "../../utils/interfaces/championship.interface";

@Injectable({
  providedIn: 'root'
})
export class TrackApiService {

  constructor(private http: HttpClient, private globalHelper: GlobalHelper) { }

  getAllTracks = () => {
    return this.http.get<Track[]>(`${devEnv.apiEndpoint}/track`, {params: {...sendTokenParam}})
  }

  search = (props: SearchTrackProps) => {
    return this.http.get<DefaultRes<Track[]>>(`${devEnv.apiEndpoint}/track/layout/search`, {params: {...sendTokenParam, ...props}}).pipe(
      catchError((err: HttpResponse<DefaultRes<Track[]>>, caught) => {

        // this.globalHelper.showErrorMessage('Error', err.body?.error!)

        return caught;
      })
    )
  }

  /// Trazados de circuito ///

  searchLayouts = (props: SearchTrackProps) => {

    console.log(props);
    return this.http.get<DefaultRes<Track[]>>(`${devEnv.apiEndpoint}/track/layout/search`, {params: {...sendTokenParam, ...props}}).pipe(
      catchError((res: HttpResponse<DefaultRes<Track[]>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<Track[]>(res)!;
      })
    )
  }

  /**
   * Devuelve las configuraciones que coincidan con los filtros de busqueda, agrupados según su circuitos
   * @param props
   * @returns
   */
  searchLayoutsGrouped = (props: SearchTrackProps) => {
    return this.http.get<DefaultRes<Track[]>>(`${devEnv.apiEndpoint}/track/layout/search`, {params: {...sendTokenParam, ...props}}).pipe(
      catchError((err: HttpResponse<DefaultRes<Track[]>>, caught) => {

        // this.globalHelper.showErrorMessage('Error', err.body?.error!)

        return caught;
      })
    )
  }

  getStrategyTracks = () => {
    const url = `${devEnv.apiEndpoint}/track/strategy`;
    const options = { params: { ...sendTokenParam } };

    return this.http.get<DefaultRes<TrackLayout[]>>(url, options).pipe(
      catchError((res: HttpResponse<DefaultRes<TrackLayout[]>>, caught) => {
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
