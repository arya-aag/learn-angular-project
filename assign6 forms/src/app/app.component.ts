import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('signup') signupForm: NgForm;

  options = ['Basic', 'Advanced', 'Pro'];
  subOptn = 'Advanced';

  submit() {
    console.log(this.signupForm.value);
  }
}
