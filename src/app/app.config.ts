import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { IS_MOBILE_TOKEN, isMobileFactory } from '@shared/injection-tokens';
import { BreakpointObserver } from '@angular/cdk/layout';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: IS_MOBILE_TOKEN,
      useFactory: isMobileFactory,
      deps: [BreakpointObserver],
    },
  ],
};
