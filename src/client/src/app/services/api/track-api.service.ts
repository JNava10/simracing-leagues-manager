import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {League} from "../../utils/interfaces/league.interface";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {ScoreSystem} from "../../utils/interfaces/score.interface";
import {Track} from "../../utils/interfaces/track.interface";

@Injectable({
  providedIn: 'root'
})
export class TrackApiService {

  constructor(private http: HttpClient) { }

  getAllTracks = () => {
    return this.http.get<Track[]>(`${environment.apiEndpoint}/track`, {params: {...sendTokenParam}})
  }
}
