import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class FirebaseData {

  fireAuth = firebase.auth();
  ref: any;

  constructor() {        
    this.ref = firebase.database().ref('rutas/' + this.fireAuth.currentUser.uid);
    this.ref.set (null);
  }

  inserta (location: any) {
    this.ref.push ({
      latitud: location.latitude,
      longitud: location.longitude
    });
  } // inserta

} //FirebaseData
