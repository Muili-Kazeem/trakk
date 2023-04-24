import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  getAuthSub!: Subscription;
  isSigningUp: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,) {}

  ngOnInit(): void {
    // Redirect away from login page if already logged in
    this.getAuthSub = this.authService.getAuth().subscribe( user => {
      if (user) {
        this.router.navigate(['/activities']);
      }
    })

    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSignup() {
    let {valid, value} = this.signupForm;
    let {email, password} = value;

    if (valid) {
      this.isSigningUp = true;
      this.authService.signup(email, password)
      .then(res => {
        // console.log(res)
        this.router.navigate(['/activities'])
      })
      .catch(err => {
        // console.log(err);
        this.messageService.add({ key:'error', summary:err.code, closable:false, life:7000 })
        this.isSigningUp = false;
      })
    }
  }

  onGoogleSignUp() {
    this.isSigningUp = true;
    this.authService.googleSignUp()
    .then( user => {
        // console.log(user);
        this.isSigningUp = true;
        this.router.navigate(['/activities'])
      })
    .catch(err => {
      // console.log(err.message);
      this.messageService.add({ key:'error', summary:err.code, closable:false, life:7000 })
      this.isSigningUp = false;
    })
  }


  ngOnDestroy(): void {
    if (this.getAuthSub) {
      this.getAuthSub.unsubscribe()
    }
  }
}
