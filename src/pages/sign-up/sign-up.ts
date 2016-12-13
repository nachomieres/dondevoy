import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';

import { EmailValidator } from '../../validators/email';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})

export class SignUpPage {

  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.signupForm = formBuilder.group({
      nombre: ['', Validators.compose ([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  } // constructor

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  signupUser(){
    this.submitAttempt = true;

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.nombre, this.signupForm.value.email, this.signupForm.value.password).then(() => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          message: "Cuenta creada correctamente...",
          buttons: [{
            text: "Ok",  role: 'cancel', handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }]
        });
        alert.present();
      }, (error) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{text: "Ok", role: 'cancel' }]
        });
        alert.present();
      });

      this.loading = this.loadingCtrl.create({
        content: "espera por favor...",
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  } // signupUser

} // SignUpPage
