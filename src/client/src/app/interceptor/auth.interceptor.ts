import { HttpInterceptorFn } from '@angular/common/http';
import {sendTokenParam} from "../utils/constants/global.constants";
import {StorageHelper} from "../helpers/storage.helper";
import {GlobalHelper} from "../helpers/global.helper";
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sendTokenName = Object.keys(sendTokenParam)[0];

  if (req.params.has(sendTokenName)) {
    const globalHelper = inject(GlobalHelper);
    const token = globalHelper.getToken();
    const tokenParamName = 'token';

    const newRequest = req.clone({headers: req.headers.set(tokenParamName, token!)});

    // TODO: Comprobar si el token existe.

    return next(newRequest);
  }

  return next(req);
};
