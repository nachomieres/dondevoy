import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthData {

  public fireAuth: any;

  constructor() {
    this.fireAuth = firebase.auth(); // We are creating an auth reference.
    console.log('Hello AuthData Provider');
  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  } // loginUser

  logoutUser(): any {
    return this.fireAuth.signOut();
  } // logoutUser

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  } // resetPassword

  signupUser(nombre: string, email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: nombre,
        photoURL: null
      });
    });
  } // signupUser

} // AuthData
