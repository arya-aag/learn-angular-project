import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStoreService } from '../../shared/data-store.service';
import { AuthService } from '../../auth/auth.service';
import * as fromAppReducers from '../../app.reducers';
import * as fromAuthReducers from '../../auth/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState$: Observable<fromAuthReducers.AuthState>;

  constructor(
    private dataStoreSrv: DataStoreService,
    private authSrv: AuthService,
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
    this.authSrv.logout();
  }
}
