import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';

import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})

export class ResetPasswordPage {

  public resetForm;

  constructor(public authData: AuthData, public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.resetForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  } // constructor

  reset () {
    if (!this.resetForm.valid){
      console.log(this.resetForm.value);
    } else {
      console.log ('reset pass');
      this.authData.resetPassword(this.resetForm.value.email).then((user) => {
        let alert = this.alertCtrl.create({
          message: "Te hemos enviado un email con las instrucciones para resetear el password",
          buttons: [{
              text: "Ok", role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
        });
        alert.present();
      }, (error) => {
        let errorAlert = this.alertCtrl.create({
          message: 'No existe ningun usuario con ese email, revisa que este correctamente escrito.',
          buttons: [{ text: "Ok", role: 'cancel' }]
        });
        errorAlert.present();
      });
    }
  } //reset

} // ResetPasswordPage
