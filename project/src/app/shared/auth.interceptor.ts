import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAppReducers from '../app.reducers';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor, OnInit {
  constructor(private store: Store<fromAppReducers.AppState>) {}

  ngOnInit() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Auth Interceptor!', req);

    return this.store.select('auth').pipe(
      take(1),
      switchMap(authData => {
        const token = authData.token;
        const copiedReq = req.clone({
          params: req.params.set('auth', token)
        });
        return next.handle(copiedReq);
      })
    );
  }
}
