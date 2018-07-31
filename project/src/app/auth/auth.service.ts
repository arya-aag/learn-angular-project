import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor() {}

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
}
