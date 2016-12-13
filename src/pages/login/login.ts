import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignUpPage } from '../sign-up/sign-up';

import { EmailValidator } from '../../validators/email';

import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public loginForm;
  submitAttempt = false;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authData: AuthData, public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  } // constructor

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  login () {
    this.submitAttempt = true;
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.navCtrl.setRoot(HomePage, {uid: authData.uid});
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: "Error en los datos de acceso. \nRevisa el email y/o password",
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create({
        content: "espera por favor...",
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  } // login

  goToSignup () {
    this.navCtrl.push(SignUpPage);
  }

  goToResetPassword () {
    this.navCtrl.push(ResetPasswordPage);
  }

} // LoginPage
