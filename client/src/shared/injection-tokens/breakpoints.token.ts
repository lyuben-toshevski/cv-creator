import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IBreakpointStatus } from '@shared/interfaces';

export const BREAKPOINTS_TOKEN = new InjectionToken<
  Observable<IBreakpointStatus>
>('breakpoints$');
