import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PreTestPage } from '../pre-test/pre-test';
import { ProsTestPage } from '../pros-test/pros-test';

/**
 * Generated class for the CuestionariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuestionarios',
  templateUrl: 'cuestionarios.html',
})
export class CuestionariosPage {

  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = PreTestPage;
    this.tab2 = ProsTestPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuestionariosPage');
  }

}
