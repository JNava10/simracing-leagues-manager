import { CanActivateFn } from '@angular/router';

export const isLeagueMemberGuard: CanActivateFn = (route, state) => {
  return true;
};
