import { Type } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { SectionType, TemplateType } from '@shared/enums';
import { SectionData } from '@shared/interfaces';
import { CvData } from '@shared/models';

export const loadCv = createAction('[CV] Load Cv');

export const loadCvSuccess = createAction(
  '[CV] Load Cv Success',
  props<{ cv: CvData; selectedTemplate: Type<unknown> }>()
);

export const loadCvFailure = createAction(
  '[CV] Load Cv Failure',
  props<{ error: any }>()
);

export const updateCv = createAction(
  '[CV] Update Cv',
  props<{ sectionType: SectionType; data: SectionData }>()
);

export const selectTemplate = createAction(
  '[CV] Select Template',
  props<{ selectedTemplateType: TemplateType }>()
);

export const selectTemplateSuccess = createAction(
  '[CV] Select Template Success',
  props<{ selectedTemplate: Type<unknown> }>()
);
