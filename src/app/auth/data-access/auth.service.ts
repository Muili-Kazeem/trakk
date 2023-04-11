import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: Auth ) {}
  userId: string | undefined;

  getAuth() {
    return authState(this.fireAuth)
  }

  login(email:string, password: string) {
    return signInWithEmailAndPassword(this.fireAuth, email, password)
  }

  signup(email:string, password: string) {
    return createUserWithEmailAndPassword(this.fireAuth, email, password)
  }

  logout() {
    return signOut(this.fireAuth);
  }

  // googleSignUp(email:string, password: string) {
  //   return signInWithPopup()
  // }
}
