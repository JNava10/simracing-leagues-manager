import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding, withRouterConfig} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptor/auth.interceptor";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";
import {MessageService} from "primeng/api";
import {GlobalHelper} from "./helpers/global.helper";
import {TableModule, TableService} from "primeng/table";

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    TableModule,
    TableService,
    provideAnimations(),
    provideCharts(withDefaultRegisterables()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(),
      withRouterConfig({paramsInheritanceStrategy: 'always'})),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
