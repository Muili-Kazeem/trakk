import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: '',
      password: '',
    })
  }

  onSignup() {
    let {valid, value} = this.signupForm;
    let {email, password} = value;
    console.log(valid, value);

    this.authService.signup(email, password)
      .then(res => { console.log(res)})
      .catch(err => { console.log(JSON.stringify(err.message))})
  }
}
