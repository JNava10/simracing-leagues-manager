import { Component, inject, Injectable } from '@angular/core';
import {StorageHelper} from "./storage.helper";
import {Message, MessageService} from "primeng/api";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { Router } from '@angular/router';
import { devEnv } from '../../environments/environment.development';
import {DefaultRes} from "../utils/interfaces/responses/response.interface";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GlobalHelper {

  private router = inject(Router);
  private storageHelper = inject(StorageHelper);
  private messageService = new MessageService()
  private tokenKey = 'token'

  /**
   * Guarda el token en el navegador.
   * @param token
   */
  saveToken = (token: string) => {
    this.storageHelper!.save(this.tokenKey, token);
  }

  /**
   * Obtiene el token guardado en el navegador.
   * @param token
   */
  getToken = () => {
    return this.storageHelper!.get(this.tokenKey);
  }

  showErrorMessage = (title: string, message: string, messageService?: MessageService) => {
    messageService!.add({severity: 'error', summary: title, detail: message});
  }

  showSuccessMessage = (title: string, message: string, messageService?: MessageService) => {
    this.messageService.add({severity: 'success', summary: title, detail: message});
  }

  handleApiError = (errorMsg: string, err: HttpResponse<DefaultRes>) => {
    console.error(errorMsg, err);

    if (err.status === 0)  {
      this.showErrorMessage('No se ha podido conectar con el servidor', 'Comprueba si tienes conexión a internet')
    }
  };

  handleRequestDefaultError = (error: any, messageService: MessageService) => {
    this.showErrorMessage(`${error.status}`, error.statusText, messageService);
  }

  navigateFromRoot = (route: string, params?: any) => {
    if (route.startsWith('/')) {
      route = route.slice(1, route.length);
    }

    if (params) {
      this.router.navigate([`${devEnv.rootRoute}/${route}`], {queryParams: params});
    } else {
      this.router.navigate([`${devEnv.rootRoute}/${route}`]);
    }
  }

  arrayByNumber = (count: number) => {
    return [].constructor(count)
  }
}
