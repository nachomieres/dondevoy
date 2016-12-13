import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform) {
    // Inicializacion de firebase
    firebase.initializeApp({
      apiKey: "AIzaSyBSIJ5QyOh90Q92wQG2C4BCnZp8mmtECCo",
      authDomain: "dondeando.firebaseapp.com",
      databaseURL: "https://dondeando.firebaseio.com",
      storageBucket: "project-6272698264410432201.appspot.com",
      messagingSenderId: "300387384343"
    });

    /*/ si no hay usuario va a la pagina de login
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = HomePage;
      }
    });*/
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
