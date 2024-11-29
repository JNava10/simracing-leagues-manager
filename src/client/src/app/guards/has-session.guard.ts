import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthApiService} from "../services/api/auth-api.service";
import {GlobalHelper} from "../helpers/global.helper";

export const hasSessionGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthApiService);
  const globalHelper = inject(GlobalHelper);

  const auth = authService.isAuth().subscribe(res => {
    if (!res.auth) {
      globalHelper.navigateFromRoot('not-auth')
      return false;
    }

    return true;
  })

  return false;
};
