import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TallerProvider } from '../../providers/taller/taller';
import { Nrc } from '../../models/nrc';
import { UserProvider } from '../../providers/user/user';

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
    private tallerProvider: TallerProvider,
    private userProvider: UserProvider
  ) {
    if (this.userProvider.loguedUser.admin) {
      this.fetchAdmin();
    } else {
      this.fetchUser();
    }
  }

  nrcTapped(nrc) {
    if (this.userProvider.loguedUser.admin) {
      this.navCtrl.push('StudentListPage', {data: nrc});
    }
  }

  fetchAdmin() {
    this.tallerProvider.readNrcs(snapshot => {
      let nrcData = snapshot.val();
      let tempArray = [];
      for(var key in nrcData) {
        tempArray.push(nrcData[key])
      }
      this.NRCs = tempArray;
    });
  }

  fetchUser() {
    this.tallerProvider.readAssistants(this.userProvider.loguedUser.uid, snapshot => {
      let nrcData = snapshot.val();
      let tempArray = [];
      for(var key in nrcData) {
        tempArray.push(nrcData[key]); 
      }
      this.NRCs = tempArray;
    });
  }

  add() {
    this.navCtrl.push('NewNrcPage', { nrc: new Nrc() });
  }

}
