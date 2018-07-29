import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user: {
    username: '';
    email: '';
    gender: '';
    question: '';
    answer: '';
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signUpForm.form.patchValue({
      userData: {
        username: 'Arya'
      }
    });
  }

  onSubmit() {
    this.user = {
      username: this.signUpForm.value.userData.username,
      email: this.signUpForm.value.userData.email,
      gender: this.signUpForm.value.gender,
      question: this.signUpForm.value.secret,
      answer: this.signUpForm.value.qAnswer
    };
    this.submitted = true;
    this.signUpForm.reset();
  }
}
