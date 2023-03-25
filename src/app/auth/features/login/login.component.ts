import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  getAuthSub!: Subscription;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Redirect away from login page if already logged in
    this.getAuthSub = this.authService.getAuth().subscribe( user => {
      if (user) {
        this.router.navigate(['/activities']);
      }
    })

    // Login form model
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  // Logging in handlng function
  onLogin() {
    let {valid, value} = this.loginForm;
    let {email, password} = value;

    if (valid) {
      console.log(valid, value);
      this.authService.login(email, password)
      .then(res => {
        // Use toasts
        console.log("You are logged in")
        // redirect to dashboard
      })
      .catch(err => {
        // Toast to send error message back
        console.log(JSON.stringify(err.code))
      })
    }
  }


  ngOnDestroy(): void {
    if (this.getAuthSub) {
      this.getAuthSub.unsubscribe()
    }
  }
}
