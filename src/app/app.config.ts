import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  BREAKPOINTS_TOKEN,
  breakpointsFactory,
  IS_MOBILE_TOKEN,
  isMobileFactory,
} from '@shared/injection-tokens';
import { BreakpointObserver } from '@angular/cdk/layout';
import { provideAnimations } from '@angular/platform-browser/animations';

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
