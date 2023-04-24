import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: Auth ) {}

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

  googleSignUp() {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(this.fireAuth, provider);
  }
}
