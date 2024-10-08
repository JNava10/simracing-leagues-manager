import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {League} from "../../utils/interfaces/league.interface";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {ScoreSystem} from "../../utils/interfaces/score.interface";
import {SearchTrackProps, Track, TrackLayout} from "../../utils/interfaces/track.interface";
import { DefaultRes } from '../../utils/interfaces/responses/response.interface';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackApiService {

  constructor(private http: HttpClient) { }

  getAllTracks = () => {
    return this.http.get<Track[]>(`${environment.apiEndpoint}/track`, {params: {...sendTokenParam}})
  }

  search = (props: SearchTrackProps) => {
    return this.http.get<DefaultRes<Track[]>>(`${environment.apiEndpoint}/track/layout/search`, {params: {...sendTokenParam, ...props}}).pipe(
      catchError((err: HttpResponse<DefaultRes<Track[]>>, caught) => {

        // this.globalHelper.showErrorMessage('Error', err.body?.error!)

        return caught;
      })
    )
  }

  /// Trazados de circuito ///

  searchLayouts = (props: SearchTrackProps) => {
    return this.http.get<DefaultRes<TrackLayout[]>>(`${environment.apiEndpoint}/track/layout/search`, {params: {...sendTokenParam, ...props}}).pipe(
      catchError((err: HttpResponse<DefaultRes<Track[]>>, caught) => {

        return caught;
      })
    )
  }

  /**
   * Devuelve las configuraciones que coincidan con los filtros de busqueda, agrupados según su circuitos
   * @param props
   * @returns
   */
  searchLayoutsGrouped = (props: SearchTrackProps) => {
    return this.http.get<DefaultRes<Track[]>>(`${environment.apiEndpoint}/track/layout/search`, {params: {...sendTokenParam, ...props}}).pipe(
      catchError((err: HttpResponse<DefaultRes<Track[]>>, caught) => {

        // this.globalHelper.showErrorMessage('Error', err.body?.error!)

        return caught;
      })
    )
  }
}
