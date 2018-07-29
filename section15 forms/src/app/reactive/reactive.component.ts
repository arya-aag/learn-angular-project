import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Adolf', 'Hitler'];

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('', [Validators.required, this.validateUsername.bind(this)]),
        email: new FormControl('', [Validators.required, Validators.email], this.validateEmail)
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  onAddHobby() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  validateUsername(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { forbiddenUserName: true };
    }
    return null;
  }

  validateEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ forbiddenEmail: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
