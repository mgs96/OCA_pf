import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the PreTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pre-test',
  templateUrl: 'pre-test.html',
})
export class PreTestPage {

  isToggled: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public iab: InAppBrowser
  ) {
  }

  openLink(link: string) {
    this.iab.create(link);
  }

  notifyAndUpdateIsToggled() {
    console.log("HEY listen", this.isToggled)
  }

}
