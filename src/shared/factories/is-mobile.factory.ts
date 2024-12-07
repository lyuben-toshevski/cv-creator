import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints } from '@shared/enums';

export function isMobileFactory(
  breakpointObserver: BreakpointObserver
): Observable<boolean> {
  return breakpointObserver.observe([`(max-width: ${Breakpoints.XSMax})`]).pipe(
    map((result) => result.matches),
    shareReplay()
  );
}
