import { createAction, props } from '@ngrx/store';
import { User } from '@auth0/auth0-spa-js';

export const setUser = createAction(
  '[User] Set User',
  props<{ user: User }>()
);

export const clearUser = createAction('[User] Clear User');
