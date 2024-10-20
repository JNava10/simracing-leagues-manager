import { Component, inject, Injectable } from '@angular/core';
import {StorageHelper} from "./storage.helper";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import { Router } from '@angular/router';
import { devEnv } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GlobalHelper {

  constructor(private storageHelper?: StorageHelper) {}

  private router = inject(Router);
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

  showSuccessMessage = (title: string, message: string, messageService: MessageService) => {
    messageService.add({severity: 'success', summary: title, detail: message});
  }

  handleRequestDefaultError = (error: any, messageService: MessageService) => {
    this.showErrorMessage(`${error.status}`, error.statusText, messageService);
  }

  navigateFromRoot = (route: string) => {
    if (route.startsWith('/')) {
      const routeFixed = route.slice(1, route.length);
      this.router.navigate([`${devEnv.rootRoute}/${routeFixed}`]);

      return;
    }

    this.router.navigate([`${devEnv.rootRoute}/${route}`]);
  }

  arrayByNumber = (count: number) => {
    return [].constructor(count)
  }
}
