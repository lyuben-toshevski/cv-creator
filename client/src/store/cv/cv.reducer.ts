import { createReducer, on } from '@ngrx/store';
import { CvData } from '@shared/models';
import { initialData } from '@shared/services';

import * as CvActions from './cv.actions';
import { Type } from '@angular/core';

export interface CvState {
  cv: CvData;
  error: any | null;
  loading: boolean;
  selectedTemplate: Type<unknown> | null;
}

export const initialState: CvState = {
  cv: new CvData(initialData),
  error: null,
  loading: false,
  selectedTemplate: null,
};

export const cvReducer = createReducer(
  initialState,
  on(CvActions.loadCv, (state) => ({
    ...state,
    loading: true,
  })),
  on(CvActions.loadCvSuccess, (state, { cv, selectedTemplate }) => ({
    ...state,
    cv,
    selectedTemplate,
    error: null,
    loading: false,
  })),
  on(CvActions.loadCvFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(CvActions.updateCv, (state, { sectionType, data }) => ({
    ...state,
    cv: {
      ...state.cv,
      [sectionType]: data,
    },
  })),
  on(CvActions.selectTemplateSuccess, (state, { selectedTemplate }) => ({
    ...state,
    selectedTemplate,
  }))
);
