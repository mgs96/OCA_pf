import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { ChatProvider } from '../../providers/chat/chat';
import { UserProvider } from '../../providers/user/user';

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
  isAdmin = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider, public events: Events, public alertCtrl: AlertController, public chatservice: ChatProvider, private userProvider: UserProvider) {
    this.isAdmin = this.userProvider.loguedUser.admin;
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
    const friends = this.myfriends;
    this.navCtrl.push('BuddiesPage', { data: friends });
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

  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push('BuddychatPage');
  }

}
