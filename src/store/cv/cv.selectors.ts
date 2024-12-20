import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CvState } from './cv.reducer';

export const selectCvState = createFeatureSelector<CvState>('cv');
export const selectCv = createSelector(selectCvState, (state) => state.cv);
export const selectTemplate = createSelector(
  selectCvState,
  (state) => state.selectedTemplate
);
export const selectCvError = createSelector(
  selectCvState,
  (state) => state.error
);
