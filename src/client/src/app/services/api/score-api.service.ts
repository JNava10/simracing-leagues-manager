import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {devEnv} from "../../../environments/environment.development";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {ScoreSystem} from "../../utils/interfaces/score.interface";

@Injectable({
  providedIn: 'root'
})
export class ScoreApiService {

  constructor(private http: HttpClient) { }

  getAllScoreSystems = () => {
    return this.http.get<ScoreSystem[]>(`${devEnv.apiEndpoint}/score`, {params: {...sendTokenParam}})
  }
}
