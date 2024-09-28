import { Injectable } from '@angular/core';
import {StorageHelper} from "./storage.helper";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GlobalHelper {

  constructor(private storageHelper: StorageHelper) { }

  private tokenKey = 'token'

  saveToken = (token: string) => {

    this.storageHelper.save(this.tokenKey, token);
  }

  getToken = () => {
    return this.storageHelper.get(this.tokenKey);
  }

  showErrorMessage = (title: string, message: string, messageService: MessageService) => {
    messageService.add({severity: 'error', summary: title, detail: message});
  }

  showSuccessMessage = (title: string, message: string, messageService: MessageService) => {
    messageService.add({severity: 'success', summary: title, detail: message});
  }

  handleRequestDefaultError = (error: any, messageService: MessageService) => {
    this.showErrorMessage(`${error.status}`, error.statusText, messageService);
  }
}
