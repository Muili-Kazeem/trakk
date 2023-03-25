import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: Auth) { }

  login(email:string, password: string) {
    return signInWithEmailAndPassword(this.fireAuth, email, password)
  }

  signup(email:string, password: string) {
    return createUserWithEmailAndPassword(this.fireAuth, email, password)
  }

  // googleSignUp(email:string, password: string) {
  //   return signInWithPopup()
  // }
}
