import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evens: number[] = [];
  odds: number[] = [];

  addOddNumber(num: number) {
    this.odds.push(num);
  }

  addEvenNumber(num: number) {
    this.evens.push(num);
  }

  clearList() {
    this.evens = [];
    this.odds = [];
  }
}
