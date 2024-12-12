import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthState } from '@store/auth/auth.reducer';
import { selectUser } from '@store/auth/auth.selectors';

export const authenticatedGuard: CanActivateFn = () => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};
