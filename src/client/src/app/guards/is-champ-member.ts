import {ActivatedRoute, CanActivateFn} from '@angular/router';
import {map} from "rxjs/operators";
import {inject} from "@angular/core";
import {AuthApiService} from "../services/api/auth-api.service";
import {ChampionshipApiService} from "../services/api/championship-api.service";
import {GlobalHelper} from "../helpers/global.helper";

export const isChampMember: CanActivateFn = (route, state) => {

  const champService = inject(ChampionshipApiService);
  const globalHelper = inject(GlobalHelper);

  const champId = +route.params['champId'];
  const leagueId = +route.params['leagueId'];

  return champService.isMember(champId).pipe(
    map(res => {
      if (!res.exists) {
        globalHelper.navigateFromRoot(`league/${leagueId}/championships/${champId}/enter`);

        return false;
      }

      return true;
    })
  )
};
