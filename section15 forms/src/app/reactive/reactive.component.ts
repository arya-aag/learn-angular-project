import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      gender: new FormControl('male')
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }
}
