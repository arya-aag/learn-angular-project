import { Component } from '@angular/core';
import { DataStoreService } from '../shared/data-store.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStoreSrv: DataStoreService) {}

  saveData() {
    this.dataStoreSrv.storeRecipes().subscribe(console.log);
  }

  fetchData() {
    this.dataStoreSrv.fetchRecipes().subscribe(console.log);
  }

  resetData() {
    this.dataStoreSrv.setDefaultRecipes().subscribe(console.log);
  }
}
