import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setUser, clearUser } from './user.actions';
import { map, mergeMap } from 'rxjs/operators';
import { Auth0Service } from '../../core/services/auth0/auth0.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private auth0Service: Auth0Service
  ) { }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Load User'),
      mergeMap(() =>
        this.auth0Service.getClient().getUser().then(user => {
          if (user) {
            return setUser({ user });
          } else {
            // handle the case where user is undefined, e.g., return an empty action or log an error
            return { type: '[User] No User Found' };
          }
        })
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Logout User'),
      map(() => {
        this.auth0Service.logout();
        return clearUser();
      })
    )
  );
}
