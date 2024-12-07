import { createAction, props } from '@ngrx/store';
import { SectionType } from '@shared/enums';
import { SectionData } from '@shared/interfaces';
import { CvData } from '@shared/models';

export const loadCv = createAction('[CV] Load Cv');

export const loadCvSuccess = createAction(
  '[CV] Load Cv Success',
  props<{ cv: CvData }>()
);

export const loadCvFailure = createAction(
  '[CV] Load Cv Failure',
  props<{ error: any }>()
);

export const updateCv = createAction(
  '[CV] Update Cv',
  props<{ sectionType: SectionType; data: SectionData }>()
);
