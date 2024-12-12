import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const IS_MOBILE_TOKEN = new InjectionToken<Observable<boolean>>(
  'isMobile$'
);
