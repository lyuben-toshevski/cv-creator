import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CvService, TemplateService } from '@shared/services';

import * as CvActions from './cv.actions';

@Injectable()
export class CvEffects {
  constructor(
    private _actions$: Actions,
    private _cvService: CvService,
    private _templateService: TemplateService
  ) {}

  loadCv$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CvActions.loadCv),
      mergeMap(() =>
        forkJoin({
          cv: this._cvService.getCvData(),
          selectedTemplate: this._templateService.getSelectedTemplate(),
        }).pipe(
          map(({ cv, selectedTemplate }) =>
            CvActions.loadCvSuccess({
              cv,
              selectedTemplate,
            })
          ),
          catchError((error) => of(CvActions.loadCvFailure({ error })))
        )
      )
    )
  );

  selectTemplate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CvActions.selectTemplate),
      tap(({ selectedTemplateType }) =>
        this._templateService.selectTemplate(selectedTemplateType)
      ),
      map(({ selectedTemplateType }) =>
        this._templateService.getComponentByType(selectedTemplateType)
      ),
      map((selectedTemplate) =>
        CvActions.selectTemplateSuccess({ selectedTemplate })
      )
    )
  );
}
