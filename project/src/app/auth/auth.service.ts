import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  token: string = null;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(console.log)
      .catch(console.log);
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(token => {
            this.token = token;
          });
        this.router.navigate(['/']);
      })
      .catch(console.log);
  }

  getToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => {
        this.token = token;
      });
    return this.token;
  }

  isAuthenticated() {
    return this.token !== null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
  }
}
