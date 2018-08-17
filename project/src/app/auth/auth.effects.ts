import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { Router } from '@angular/router';

import * as AuthActs from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect()
  authSignup = this.actions$.ofType(AuthActs.TRY_SIGNUP).pipe(
    map((action: AuthActs.TrySignUp) => action.payload),
    switchMap((payload: { username: string; password: string }) => {
      return from(firebase.auth().createUserWithEmailAndPassword(payload.username, payload.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActs.SIGNUP
        },
        {
          type: AuthActs.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect()
  authSignin = this.actions$.ofType(AuthActs.TRY_SIGNIN).pipe(
    map((action: AuthActs.TrySignIn) => action.payload),
    switchMap((payload: { username: string; password: string }) => {
      console.log('marker', payload);
      return from(firebase.auth().signInWithEmailAndPassword(payload.username, payload.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActs.SIGNIN
        },
        {
          type: AuthActs.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.ofType(AuthActs.TRY_LOGOUT).pipe(
    tap(() => {
      firebase.auth().signOut();
      this.router.navigate(['/signin']);
    })
  );
}
