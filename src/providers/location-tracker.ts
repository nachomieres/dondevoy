import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from 'ionic-native';

import { FirebaseData } from './firebase-data';

@Injectable()
export class LocationTracker {

  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, public firebaseData: FirebaseData) {
  }

  startTracking() {
    // Background Tracking
    let config = {
      // comun
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 5,
      maxLocations: 1000,
      interval: 2000,
      stopOnTerminate: true,
      // Android
      startForeground:true,
      locationProvider: 1,
      fastestInterval: 2000,
      activitiesInterval: 10000,
      notificationTitle: 'dondeVoy',
      notificationText: 'Guardando ruta...',
      notificationIconColor: '#387ef5',
      // iOS
      pauseLocationUpdates: false,
      saveBatteryOnBackground: false,
      activityType: 'OtherNavigation'
    };
    BackgroundGeolocation.configure((location) => {
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
        this.firebaseData.inserta(location);
      });
    }, (err) => {
      console.log(err);
    }, config); // BackgroundGeolocation.configure
    BackgroundGeolocation.start();
  } // startTracking

  stopTracking() {
    console.log('stopTracking');
      BackgroundGeolocation.stop();
  } // stopTracking

} // LocationTracker
