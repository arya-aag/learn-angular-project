import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';

import * as fromAppReducers from '../app.reducers';
import * as fromAuthReducers from '../auth/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromAppReducers.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
      map((auth: fromAuthReducers.AuthState) => {
        return auth.authenticated;
      })
    );
  }

  canLoad(route: Route) {
    return this.store.select('auth').pipe(
      map((auth: fromAuthReducers.AuthState) => {
        return auth.authenticated;
      })
    );
  }
}
