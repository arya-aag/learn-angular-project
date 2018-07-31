import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(console.log)
      .catch(console.log);
  }
}
