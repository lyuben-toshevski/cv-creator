import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BREAKPOINTS_TOKEN, IS_MOBILE_TOKEN } from '@shared/injection-tokens';
import { BreakpointObserver } from '@angular/cdk/layout';
import { provideAnimations } from '@angular/platform-browser/animations';
import { breakpointsFactory, isMobileFactory } from '@shared/factories';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    {
      provide: BREAKPOINTS_TOKEN,
      useFactory: breakpointsFactory,
      deps: [BreakpointObserver],
    },
    {
      provide: IS_MOBILE_TOKEN,
      useFactory: isMobileFactory,
      deps: [BreakpointObserver],
    },
  ],
};
