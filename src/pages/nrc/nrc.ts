import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TallerProvider } from '../../providers/taller/taller';
import { Nrc } from '../../models/nrc';

/**
 * Generated class for the NrcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nrc',
  templateUrl: 'nrc.html',
})
export class NrcPage {
  NRCs = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private tallerProvider: TallerProvider
  ) {
    this.fetch();
  }

  nrcTapped(nrc) {
    console.log("HEY LISTEN", nrc);
  }

  fetch() {
    this.tallerProvider.readNrcs().then((ok: any) => {
      this.NRCs = ok;
    });
  }

  add() {
    this.navCtrl.push('NewNrcPage', { nrc: new Nrc() });
  }

}
