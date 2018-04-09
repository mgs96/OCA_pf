import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  myrequests;
  myfriends;

  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider, public events: Events, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    });
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends; 
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  addbuddy() {
    this.navCtrl.push('BuddiesPage');
  }

  accept(item) {
    this.requestservice.acceptrequest(item).then(() => {
      let newalert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tap on the friend to chat with him',
        buttons: ['Okay']
      });
      newalert.present()
    });
  }

  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {
      alert('Request ignored');
    }).catch((err) => {
      alert(err);
    });
  }
}
