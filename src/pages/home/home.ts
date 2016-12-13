import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

import { LoginPage } from '../login/login';

import { AuthData } from '../../providers/auth-data';
import { LocationTracker } from '../../providers/location-tracker';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  uid:any = firebase.auth().currentUser.uid;
  user:any = firebase.auth().currentUser;
  guardando: boolean = false;

  constructor(public navCtrl: NavController, public platform: Platform,
              public authData: AuthData, public locationTracker: LocationTracker) {
    console.log (this.user);
    platform.ready().then(() => {
    }); // platform ready
  } // constructor

  arrancaBackground () {
    console.log ('Iniciando tracking');
    this.locationTracker.startTracking();
    this.guardando = true;
  }

  paraBackground () {
    console.log ('tracking parado');
    this.locationTracker.stopTracking();
    this.guardando = false;
  }

  logOut () {
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  shareWhats () {
    SocialSharing.shareViaWhatsApp ('Sigue mi ruta en:', null, 'http://www.nachosoft.esy.es/dondevas/');
  }

  shareEmail () {
    SocialSharing.shareViaEmail('Entra en http://www.nachosoft.esy.es/dondevas para ver mi ruta','Sigue mi ruta', null);
  }

} // HomePage
