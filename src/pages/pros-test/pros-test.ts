import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { UserProvider } from '../../providers/user/user';
import { EncuestaProvider } from '../../providers/encuesta/encuesta';

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

  isToggledPreTest: boolean;
  isToggledPostTest: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public iab: InAppBrowser,
    public userProvider: UserProvider,
    public encuestaProvider: EncuestaProvider
    ) {
      this.encuestaProvider.loadConfigurations(snapshot => {
        let toggles = snapshot.val();
        this.isToggledPreTest = toggles.preTestEnabled;
        this.isToggledPostTest = toggles.postTestEnabled;
      });
  }

  openLink(link: string) {
    this.iab.create(link);
  }

  notifyAndUpdateIsToggled() {
    this.isToggledPostTest = !this.isToggledPostTest;
    let toggle = {
      preTest: this.isToggledPreTest,
      postTest: this.isToggledPostTest
    }
    this.encuestaProvider.updateConfigurations(toggle);
  }

}
