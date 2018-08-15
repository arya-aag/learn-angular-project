import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { DataStoreService } from '../../shared/data-store.service';
import * as fromAppReducers from '../../app.reducers';
import * as fromAuthReducers from '../../auth/auth.reducers';
import * as AuthActs from '../../auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState$: Observable<fromAuthReducers.AuthState>;

  constructor(
    private dataStoreSrv: DataStoreService,
    private router: Router,
    private store: Store<fromAppReducers.AppState>
  ) {}

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  saveData() {
    this.dataStoreSrv.storeRecipes().subscribe(console.log);
  }

  fetchData() {
    this.dataStoreSrv.fetchRecipes().subscribe(console.log);
  }

  resetData() {
    this.dataStoreSrv.setDefaultRecipes().subscribe(console.log);
  }

  onLogout() {
    this.store.dispatch(new AuthActs.TryLogout());
    this.store.dispatch(new AuthActs.Logout());
  }
}
