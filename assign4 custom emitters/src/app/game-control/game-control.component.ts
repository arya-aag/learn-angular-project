import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() evenHit = new EventEmitter<number>();
  @Output() oddHit = new EventEmitter<number>();
  @Output() clearList = new EventEmitter<any>();
  index = 0;
  timer: any;

  constructor() {}

  ngOnInit() {}

  startTimer() {
    this.timer = setInterval(() => {
      if (this.index % 2 === 0) {
        this.evenHit.emit(this.index);
      } else {
        this.oddHit.emit(this.index);
      }
      this.index++;
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

  clearTimer() {
    this.index = 0;
    this.clearList.emit();
  }
}
