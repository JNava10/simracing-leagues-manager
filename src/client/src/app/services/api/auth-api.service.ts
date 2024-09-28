import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {catchError, of} from "rxjs";
import { LoggedData, LoginData } from '../../utils/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpClient) { }

  login = (loginData: LoginData) => {
    return this.http.post<LoggedData>(`${environment.apiEndpoint}/auth/login`, loginData).pipe(
      catchError((res: HttpErrorResponse) => {
        const error = res.error as LoggedData;

        return of(error);
      })
    )
  }
}
