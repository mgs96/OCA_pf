import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ProsTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pros-test',
  templateUrl: 'pros-test.html',
})
export class ProsTestPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public iab: InAppBrowser
    ) {
  }

  openLink(link: string) {
    this.iab.create(link);
  }

}
