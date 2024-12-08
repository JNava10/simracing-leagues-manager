import { inject, Injectable } from '@angular/core';
import { League, QueryIsExecuted } from "../../utils/interfaces/league.interface";
import { devEnv } from "../../../environments/environment.development";
import { sendTokenParam } from "../../utils/constants/global.constants";
import { HttpClient, HttpResponse } from "@angular/common/http";
import {
  ChampionshipPreset,
  EnterChampionship,
  GetChampProps, IsMember,
  LeagueChampionship, Position,
  PositionFormItem,
  Team
} from "../../utils/interfaces/championship.interface";
import { DefaultRes } from '../../utils/interfaces/responses/response.interface';
import { catchError, map } from 'rxjs/operators';
import { GlobalHelper } from "../../helpers/global.helper";
import {Observable, of} from 'rxjs';
import { GetTeam } from '../../utils/interfaces/responses/championship.responses';
import {Driver} from "../../utils/interfaces/rfactor.interface";

@Injectable({
  providedIn: 'root'
})
export class ChampionshipApiService {
  constructor(private http: HttpClient) { }

  private globalHelper = inject(GlobalHelper);

  create = (championship: LeagueChampionship) => {
    return this.http.post<DefaultRes<number>>(`${devEnv.apiEndpoint}/championship`, championship, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<number>>) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<number>(res)!;
      })
    );
  };

  saveRoundResults = (results: Position[], champId: number, roundNum: number) => {
    return this.http.post<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${champId}/results/${roundNum}`, results, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<LeagueChampionship>>) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<LeagueChampionship>(res)!.users;
      })
    );
  };

  sendRfactorResults(file: File, championshipId: number, roundId: number) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<DefaultRes<Driver[]>>(`${devEnv.apiEndpoint}/championship/${championshipId}/results/${roundId}/rfactor`, formData, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<Driver[]>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<Driver[]>(res)!;
      })
    );
  }

  getById = (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}`, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<LeagueChampionship>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<LeagueChampionship>(res)!;
      })
    );
  };

  getByIdFull = (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/full`, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<LeagueChampionship>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<LeagueChampionship>(res)!;
      })
    );
  };

  edit = (id: number, championship: LeagueChampionship) => {
    return this.http.put<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/`, championship, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<LeagueChampionship>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<LeagueChampionship>(res)!;
      })
    );
  };

  getResults = (id: number) => {
    return this.http.get<DefaultRes<PositionFormItem[]>>(`${devEnv.apiEndpoint}/championship/${id}/results`, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<PositionFormItem[]>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<PositionFormItem[]>(res)!;
      })
    );
  };

  getCalendarById =  (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/calendar`, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<LeagueChampionship>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<LeagueChampionship>(res)!;
      })
    );
  };

  getEntriesById = (id: number) => {
    return this.http.get<DefaultRes<LeagueChampionship>>(`${devEnv.apiEndpoint}/championship/${id}/entries`, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<LeagueChampionship>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<LeagueChampionship>(res)!;
      })
    );
  };

  enter = (data: EnterChampionship, champId: number) => {
    return this.http.post<DefaultRes<QueryIsExecuted>>(`${devEnv.apiEndpoint}/championship/${champId}/enter`, data, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<QueryIsExecuted>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<QueryIsExecuted>(res)!;
      })
    );
  };

  getTeams = (champId: number) => {
    return this.http.get<DefaultRes<GetTeam[]>>(`${devEnv.apiEndpoint}/championship/teams/${champId}`, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<GetTeam[]>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<GetTeam[]>(res)!;
      })
    );
  };

  createPreset = (championship: LeagueChampionship) => {
    return this.http.post<DefaultRes<ChampionshipPreset>>(`${devEnv.apiEndpoint}/championship/preset`, championship, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<ChampionshipPreset>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<ChampionshipPreset>(res)!;
      })
    );
  };

  getAllPresets = () => {
    return this.http.get<DefaultRes<ChampionshipPreset[]>>(`${devEnv.apiEndpoint}/championship/preset`, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<ChampionshipPreset[]>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<ChampionshipPreset[]>(res)!;
      })
    );
  };

  getPresetById(presetId: any) {
    return this.http.get<DefaultRes<ChampionshipPreset>>(`${devEnv.apiEndpoint}/championship/preset/${presetId}`, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<ChampionshipPreset>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<ChampionshipPreset>(res)!;
      })
    );
  }

  isMember(champId: number) {
    return this.http.get<DefaultRes<IsMember>>(`${devEnv.apiEndpoint}/championship/${champId}/has-member`, {params: {...sendTokenParam}}).pipe(
      catchError((res: HttpResponse<DefaultRes<IsMember>>, caught) => {
        const error = this.globalHelper!.handleApiError(res.body?.msg!, res);

        if (error instanceof Observable) {
          return error;
        } else {
          return of(error)
        }
      }),
      map((res) => {
        this.globalHelper?.showSuccessMessage({message: res.msg!})

        return this.globalHelper!.handleDefaultData<IsMember>(res)!;
      })
    );
  }
}
