import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthApiService} from "../services/api/auth-api.service";
import {GlobalHelper} from "../helpers/global.helper";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

export const hasSessionGuard: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Promise<Observable<boolean>> = async (route, state) => {
  const authService = inject(AuthApiService);
  const globalHelper = inject(GlobalHelper);

  return authService.isAuth().pipe(
    map(res => {
      if (!res.auth) {
        globalHelper.navigateFromRoot('not-auth')
        return false;
      }

      return true;
    })
  )
};
