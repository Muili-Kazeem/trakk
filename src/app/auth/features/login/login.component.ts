import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    })
  }


  onLogin() {
    let {valid, value} = this.loginForm;
    let {email, password} = value;
    console.log(valid, value);

    this.authService.login(email, password)
      .then(res => { console.log("You are logged in")})
      .catch(err => { console.log(JSON.stringify(err.code))})
  }
}
