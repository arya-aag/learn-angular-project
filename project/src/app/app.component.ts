import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp(environment.firebaseAuth);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
