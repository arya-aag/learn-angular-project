import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppReducers from '../app.reducers';
import * as AuthActs from '../auth/auth.actions';

@Injectable()
export class AuthService {
  constructor(private router: Router, private store: Store<fromAppReducers.AppState>) {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.store.dispatch(new AuthActs.SignUp());
      })
      .catch(console.log);
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.store.dispatch(new AuthActs.SignIn());
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(token => {
            this.store.dispatch(new AuthActs.SetToken(token));
          });
        this.router.navigate(['/']);
      })
      .catch(console.log);
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActs.Logout());
    this.router.navigate(['/signin']);
  }
}
