import { Component, inject, Injectable } from '@angular/core';
import {StorageHelper} from "./storage.helper";
import {Message, MessageService} from "primeng/api";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { Router } from '@angular/router';
import { devEnv } from '../../environments/environment.development';
import {DefaultRes} from "../utils/interfaces/responses/response.interface";
import {Observable, of, throwError} from "rxjs";
import {Form} from "@angular/forms";
import {OpenFileDialogProps} from "../utils/props/file.props";

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
    this.messageService!.add({severity: 'error', summary: title, detail: message});
  }

  showSuccessMessage = ({ title = "exito", message, messageService }: ShowSuccessMessageProps) => {
    this.messageService?.add({ severity: 'success', summary: title, detail: message });
  };


handleApiError = (
    errorMsg: string, res: HttpResponse<DefaultRes<any>>, caught: Observable<any>
  ) => {
    const defaultRes = { data: null } as DefaultRes<any>

    if (res.status === 0)  {
      this.showErrorMessage('No se ha podido conectar con el servidor', 'Comprueba si tienes conexión a internet');

      return defaultRes
    } else if (res.status === 404) {
      return defaultRes
    }

    return throwError(() => new Error(errorMsg));
  };

  handleDefaultData<T>(res: DefaultRes<T>) {
    if ("data" in res) {
      return res.data as T;
    } else {
      return
    }
  }

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

  getHexWithAlpha = (hex: string, opacity: number) => {
    // TODO: Validar si es un HEX.
    let hexWithAlpha = `${hex}${opacity.toString(16)}`;

    if (!hexWithAlpha.startsWith('#')) {
      hexWithAlpha = `#${hexWithAlpha}${opacity.toString(16)}`;
    }

    return hexWithAlpha;
  }

  openFileDialog = (
    {
      validExtensions,
      invalidExtensions,
      returnFormData
    }: OpenFileDialogProps
  ) => {
    return new Promise<FileList | FormData>((resolve, reject) => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';

      fileInput.onchange = ($event) => {
        const {files: fileList} = fileInput;

        // Prefiero borrar el elemento por si acaso se queda guardado, mejor eliminarlo si no se usa.
        fileInput.remove();

        if (fileList && fileList[0]) {
          const files = Array.from(fileList);

          const allExtValid = files.every((file: File) => {
            const extTemp = file.name.split(".");

            return validExtensions!.includes(extTemp.at(extTemp.length - 1)!);
          });

          if (!allExtValid) {
            reject(new Error('Extensiones de archivo no son validoss.'));
          }

          if (returnFormData) {
            const formData = new FormData();

            files.forEach((file, index) => {
              formData.append(`${index}`, file);
            });

            resolve(formData);
          } else {
            resolve(fileList);
          }
        } else {
          fileInput.remove();

          reject(new Error('No se ha seleccionado ningun archivo.'));
        }
      }

      fileInput.click();
    });
  }

  milisToLaptime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000); // 1 minuto = 60000 ms
    const seconds = Math.floor((ms % 60000) / 1000); // 1 segundo = 1000 ms
    const milliseconds = ms % 1000; // Resto de milesimas que sobran de los segundos.

    // Añadimos los ceros al principio en cada numero para que tenga el formato correcto.
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(3, '0');

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };
}

interface ShowSuccessMessageProps {
  title?: string;
  message: string;
  messageService?: MessageService;
}
