import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  error: any | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
