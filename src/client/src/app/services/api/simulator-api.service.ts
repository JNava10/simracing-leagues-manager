import { inject, Injectable, input } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {devEnv} from "../../../environments/environment.development";
import {League} from "../../utils/interfaces/league.interface";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {ScoreSystem} from "../../utils/interfaces/score.interface";
import {Category} from "../../utils/interfaces/category.interface";
import { SearchCategoryProps } from '../../utils/props/category/category.prop';
import { DefaultRes as DefaultRes } from '../../utils/interfaces/responses/response.interface';
import { catchError, of } from 'rxjs';
import { GlobalHelper } from '../../helpers/global.helper';
import { SearchSimProps, SimulatorGame } from '../../utils/interfaces/simulator.interface';
@Injectable({
  providedIn: 'root'
})
export class SimulatorApiService {

  constructor(private http: HttpClient) { }

  private globalHelper = inject(GlobalHelper);

  getAllCategories = () => {
    return this.http.get<Category[]>(`${devEnv.apiEndpoint}/category`, {params: {...sendTokenParam}})
  }


  search = (props: SearchSimProps) => {
    return this.http.get<DefaultRes<SimulatorGame[]>>(`${devEnv.apiEndpoint}/simulator/search`, {params: {...sendTokenParam, ...props}}).pipe(
      catchError((err: HttpResponse<DefaultRes<SimulatorGame[]>>, caught) => {

        this.globalHelper.showErrorMessage('Error', err.body?.error!)

        return caught;
      })
    )
  }
}
