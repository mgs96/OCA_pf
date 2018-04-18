import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import firebase from 'firebase';
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the BuddychatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buddychat',
  templateUrl: 'buddychat.html',
})
export class BuddychatPage {
  @ViewChild('content') content: Content;

  buddy:any;
  newmessage;
  allmessages = [];
  photoURL;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider, public events: Events, public zone: NgZone, public notifications: NotificationProvider) {
    this.buddy = this.chatservice.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollTo();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddychatPage');
  }

  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
    .then(() => {
      this.notifications.pushChatNotification(this.chatservice.buddy).then();
    });
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }

  scrollTo() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

}
