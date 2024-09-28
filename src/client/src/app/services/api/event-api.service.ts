import { Injectable } from '@angular/core';
import {League} from "../../utils/interfaces/league.interface";
import {environment} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {HttpClient} from "@angular/common/http";
import {ChampionshipCreation} from "../../utils/interfaces/championship.interface";

@Injectable({
  providedIn: 'root'
})
export class ChampionshipApiService {
  constructor(private http: HttpClient) { }

  createChampionship = (championship: ChampionshipCreation) => {
    return this.http.post<ChampionshipCreation>(`${environment.apiEndpoint}/championship`, championship, {params: {...sendTokenParam}})
  }
}
