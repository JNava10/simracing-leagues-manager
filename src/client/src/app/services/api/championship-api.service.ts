import { Injectable } from '@angular/core';
import {League} from "../../utils/interfaces/league.interface";
import {environment} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {HttpClient} from "@angular/common/http";
import {LeagueChampionship} from "../../utils/interfaces/championship.interface";

@Injectable({
  providedIn: 'root'
})
export class ChampionshipApiService {
  constructor(private http: HttpClient) { }

  createChampionship = (championship: LeagueChampionship) => {
    return this.http.post<LeagueChampionship>(`${environment.apiEndpoint}/championship`, championship, {params: {...sendTokenParam}})
  }
}
