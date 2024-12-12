import { inject, Injectable, input } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {devEnv} from "../../../environments/environment.development";
import {League} from "../../utils/interfaces/league.interface";
import {sendTokenParam} from "../../utils/constants/global.constants";
import {ScoreSystem} from "../../utils/interfaces/score.interface";
import {Category} from "../../utils/interfaces/category.interface";
import { SearchCategoryProps } from '../../utils/props/category.props';
import { DefaultRes as DefaultRes } from '../../utils/interfaces/responses/response.interface';
import { catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { GlobalHelper } from '../../helpers/global.helper';
@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  constructor(private http: HttpClient) { }

  private globalHelper = inject(GlobalHelper);

  getAllCategories = () => {
    return this.http.get<Category[]>(`${devEnv.apiEndpoint}/category`, {params: {...sendTokenParam}})
  }

  /**
   * Busca las categorías que tengan las propiedades indicadas.
   * @param props
   */
  search = (props: SearchCategoryProps) => {
    return this.http.get<DefaultRes<Category[]>>(`${devEnv.apiEndpoint}/category/search`, {params: {...sendTokenParam, ...props}}).pipe(
      catchError((err: HttpResponse<DefaultRes<Category[]>>, caught) => {
        this.globalHelper.showErrorMessage('Error', err.body?.error!)

        return caught;
      })
    )
  }
}
