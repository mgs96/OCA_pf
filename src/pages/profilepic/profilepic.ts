import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ProfilepicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

  moveon = true;
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/ocapf-197122.appspot.com/o/chatterplace.png?alt=media&token=2499dcde-0a1a-4078-b390-5dd5f5607c68';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider, public zone: NgZone, public userservice: UserProvider, public loadinCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepicPage');
  }

  chooseimage() {
    let loader = this.loadinCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.imgservice.uploadimage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() =>{
        this.imgurl = uploadedurl;
        this.moveon = false;
      });
    });
  }

  updateproceed() {
    let loader = this.loadinCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.userservice.updateimage(this.imgurl).then((res: any) => {
      loader.dismiss;
      if (res.success) {
        loader.dismiss();
        this.navCtrl.setRoot('TabsPage');
      } else {
        alert(res);
      }
    });
  }

  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }

}
