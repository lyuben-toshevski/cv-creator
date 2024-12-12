import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BREAKPOINTS_TOKEN, IS_MOBILE_TOKEN } from '@shared/injection-tokens';
import { BreakpointObserver } from '@angular/cdk/layout';
import { provideAnimations } from '@angular/platform-browser/animations';
import { breakpointsFactory, isMobileFactory } from '@shared/factories';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { authReducer } from '@store/auth/auth.reducer';
import { cvReducer } from '@store/cv/cv.reducer';
import { AuthEffects } from '@store/auth/auth.effects';
import { CvEffects } from '@store/cv/cv.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'cv', reducer: cvReducer }),
    provideEffects([AuthEffects, CvEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
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
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
  ],
};
