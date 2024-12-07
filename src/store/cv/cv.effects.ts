import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CvService } from '@shared/services';

import * as CvActions from './cv.actions';

@Injectable()
export class CvEffects {
  constructor(private _actions$: Actions, private _cvService: CvService) {}

  loadCv$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CvActions.loadCv),
      mergeMap(() =>
        this._cvService.getCvData().pipe(
          map(
            (cv) => CvActions.loadCvSuccess({ cv }),
            catchError((error) => of(CvActions.loadCvFailure({ error })))
          )
        )
      )
    )
  );
}
