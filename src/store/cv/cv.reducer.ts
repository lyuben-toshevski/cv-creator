import { createReducer, on } from '@ngrx/store';
import { CvData } from '@shared/models';
import { initialData } from '@shared/services';

import * as CvActions from './cv.actions';

export interface CvState {
  cv: CvData;
  error: any | null;
  loading: boolean;
}

export const initialState: CvState = {
  cv: new CvData(initialData),
  error: null,
  loading: false,
};

export const cvReducer = createReducer(
  initialState,
  on(CvActions.loadCv, (state) => ({
    ...state,
    loading: true,
  })),
  on(CvActions.loadCvSuccess, (state, { cv }) => ({
    ...state,
    cv,
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
  }))
);
