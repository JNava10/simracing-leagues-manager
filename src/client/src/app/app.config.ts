import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding, withRouterConfig} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding(), withRouterConfig({paramsInheritanceStrategy: 'always'})), provideHttpClient(withInterceptors([authInterceptor]))]
};
