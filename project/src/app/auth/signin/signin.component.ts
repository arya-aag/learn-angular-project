import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAppReducers from '../../app.reducers';
import * as AuthActs from '../auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private store: Store<fromAppReducers.AppState>) {}

  ngOnInit() {}

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    console.log(password);
    this.store.dispatch(new AuthActs.TrySignIn({ username: email, password }));
  }
}
