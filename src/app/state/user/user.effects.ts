import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setUser, clearUser } from './user.actions';
import { map, mergeMap } from 'rxjs/operators';
import { Auth0Service } from '../../core/services/auth0/auth0.service';

/**
 * =========================================
 * ⚠️ NOT IN USE - Kept for reference only ⚠️
 * =========================================
 */
@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private auth0Service: Auth0Service
  ) { }

  // Effect to load the user data when the 'Load User' action is dispatched
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Load User'),
      mergeMap(() =>
        this.auth0Service.getClient().getUser().then(user => {
          if (user) {
            // If a user is found, dispatch the 'setUser' action to update the state with the user data
            return setUser({ user });
          } else {
            // Handle the case where user is undefined.
            return { type: '[User] No User Found' };
          }
        })
      )
    )
  );

  // Effect to log out the user when the 'Logout User' action is dispatched
  // Way to call: this.store.dispatch({ type: '[App] Load User'});
  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Logout User'),
      map(() => {
        this.auth0Service.logout();
        // Dispatching the 'clearUser' action to clear the user data from the state
        return clearUser();
      })
    )
  );
}
