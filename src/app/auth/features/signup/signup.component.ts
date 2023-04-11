import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { ActivitiesDataService } from 'src/app/activities/data-access/activities-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dataService: ActivitiesDataService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSignup() {
    let {valid, value} = this.signupForm;
    let {email, password} = value;

    if (valid) {
      this.authService.signup(email, password)
      .then(res => {
        this.router.navigate(['/activities'])
        console.log(res)
      })
      .catch(err => { console.log(JSON.stringify(err.message))})
    }
  }
}
