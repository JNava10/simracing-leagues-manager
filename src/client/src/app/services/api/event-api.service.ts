import { Injectable } from '@angular/core';
import {League} from "../../utils/interfaces/league.interface";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {HttpClient} from "@angular/common/http";
import {LeagueChampionship} from "../../utils/interfaces/championship.interface";

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  constructor(private http: HttpClient) { }

  createChampionship = (championship: LeagueChampionship) => {
    return this.http.post<LeagueChampionship>(`${devEnv.apiEndpoint}/championship`, championship, {params: {...sendTokenParam}})
  }
}
