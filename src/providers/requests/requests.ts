import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { connreq } from '../../models/request';
import { UserProvider } from '../user/user';
import { Events } from 'ionic-angular';

/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {

  firereq = firebase.database().ref('/requests');
  userdetails;

  constructor(public userservice: UserProvider, public events: Events) {
    console.log('Hello RequestsProvider Provider');
  }

  sendrequest(req: connreq) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push().set({
        sender: req.sender
      }).then(() =>{
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      myrequests = [];
      for (var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      this.userservice.getallusers().then((res) => {
        var allusers = res;
        this.userdetails = [];
        for (var j in myrequests)
          for (var key in allusers) {
            if (myrequests[j] === allusers[key].uid) {
              this.userdetails.push(allusers[key]);
            }
          }
        this.events.publish('gotrequests');
      })
    })
  }

}
