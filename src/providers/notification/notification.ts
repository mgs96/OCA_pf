import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  private chatNotifications = firebase.database().ref('/notifications/chats');

  constructor() {
    
  }

  pushChatNotification(receiver) {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/users/').child(firebase.auth().currentUser.uid).once('value', (snapShot) => {
        const sender = snapShot.val();
        this.chatNotifications.push().set({
          sender: firebase.auth().currentUser.displayName,
          receiver: receiver.token,
          message: "Tienes un nuevo mensaje!",
          senderData: sender
        })
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
      })
      .then(() => {
        resolve(true);
      })
      .catch(error => reject(error));
    });
    return promise;
  }

}
