import { BreakpointObserver } from '@angular/cdk/layout';
import { Breakpoints } from '@shared/enums';
import { IBreakpointStatus } from '@shared/interfaces';
import { Observable, map, shareReplay } from 'rxjs';

const CUSTOM_BREAKPOINTS = {
  XSMin: `(min-width: ${Breakpoints.XSMin})`,
  XSMax: `(max-width: ${Breakpoints.XSMax})`,
  SMMin: `(min-width: ${Breakpoints.SMMin})`,
  SMMax: `(max-width: ${Breakpoints.SMMax})`,
  MDMin: `(min-width: ${Breakpoints.MDMin})`,
  MDMax: `(max-width: ${Breakpoints.MDMax})`,
  LGMin: `(min-width: ${Breakpoints.LGMin})`,
  LGMax: `(max-width: ${Breakpoints.LGMax})`,
  XLMin: `(min-width: ${Breakpoints.XLMin})`,
};

export function breakpointsFactory(
  breakpointObserver: BreakpointObserver
): Observable<IBreakpointStatus> {
  return breakpointObserver.observe(Object.values(CUSTOM_BREAKPOINTS)).pipe(
    map((result) => ({
      XSMin: result.breakpoints[CUSTOM_BREAKPOINTS.XSMin],
      XSMax: result.breakpoints[CUSTOM_BREAKPOINTS.XSMax],
      SMMin: result.breakpoints[CUSTOM_BREAKPOINTS.SMMin],
      SMMax: result.breakpoints[CUSTOM_BREAKPOINTS.SMMax],
      MDMin: result.breakpoints[CUSTOM_BREAKPOINTS.MDMin],
      MDMax: result.breakpoints[CUSTOM_BREAKPOINTS.MDMax],
      LGMin: result.breakpoints[CUSTOM_BREAKPOINTS.LGMin],
      LGMax: result.breakpoints[CUSTOM_BREAKPOINTS.LGMax],
      XLMin: result.breakpoints[CUSTOM_BREAKPOINTS.XLMin],
    })),
    shareReplay()
  );
}
