import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { usercreds } from '../../models/usercreds';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginfbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginfb',
  templateUrl: 'loginfb.html',
})
export class LoginfbPage {

  credentials = {} as usercreds;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _auth : AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginfbPage');
  }

  signin() {
    this._auth.login(this.credentials).then((res: any) => {
      if (!res.code) {
        this.navCtrl.setRoot('TabsPage');
      } else {
        alert(res);
      }
    });
  }

  passwordReset() {

  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
