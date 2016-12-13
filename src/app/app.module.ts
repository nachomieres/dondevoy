import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignUpPage } from '../pages/sign-up/sign-up';

import { AuthData } from '../providers/auth-data';
import { LocationTracker } from '../providers/location-tracker';
import { FirebaseData } from '../providers/firebase-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignUpPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignUpPage
  ],
  providers: [AuthData, LocationTracker, FirebaseData]
})
export class AppModule {}
