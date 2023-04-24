import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { ActivitiesDataService } from 'src/app/activities/data-access/activities-data.service';
import { AuthService } from '../../data-access/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  loginForm!: FormGroup;
  getAuthSub!: Subscription;
  isLoggingIn: boolean = false;

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

  // Logging in handle function
  onLogin() {
    let {valid, value} = this.loginForm;
    let {email, password} = value;
    this.isLoggingIn = true;

    if (valid) {
      this.authService.login(email, password)
      .then(res => {
        // console.log(res)
        this.router.navigate(['/activities'])
      })
      .catch(err => {
        this.isLoggingIn = false;
        this.messageService.add({ key:'error', summary: err.code, closable:false, life:7000 });
      })
    } else {
      this.messageService.add({ key:'error', summary: "Input valid login credentials", closable:false, life:3000 })
      this.isLoggingIn = false;
    }
  }

  onGoogleSignUp() {
    this.isLoggingIn = true;
    this.authService.googleSignUp()
    .then( user => {
        // console.log(user);
        this.isLoggingIn = true;
        this.router.navigate(['/activities'])
      })
    .catch(err => {
      // console.log(JSON.stringify(err.message));
      this.messageService.add({ key:'error', summary:err.code, closable:false, life:7000 })
      this.isLoggingIn = false;
    })
  }


  ngOnDestroy(): void {
    if (this.getAuthSub) {
      this.getAuthSub.unsubscribe()
    }
  }
}
