import { Component } from '@angular/core';
import { DataStoreService } from '../shared/data-store.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStoreSrv: DataStoreService, private authSrv: AuthService) {}

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

  isAuthenticated() {
    return this.authSrv.isAuthenticated();
  }
}
