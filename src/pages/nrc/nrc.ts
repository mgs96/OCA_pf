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
    this.navCtrl.push('StudentListPage', {data: nrc});
  }

  fetch() {
    this.tallerProvider.readNrcs(snapshot => {
      let nrcData = snapshot.val();
      let tempArray = [];
      for(var key in nrcData) {
        tempArray.push(nrcData[key])
      }
      this.NRCs = tempArray;
    });
  }

  add() {
    this.navCtrl.push('NewNrcPage', { nrc: new Nrc() });
  }

}
