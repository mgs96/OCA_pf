import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { connreq } from '../../models/request';
import { RequestsProvider } from '../../providers/requests/requests';
import firebase from 'firebase';

/**
 * Generated class for the BuddiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {

  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];
  friends = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider, public alertCtrl: AlertController, public requestservice: RequestsProvider) {
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    });
    this.friends = this.navParams.get('data');
  }

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.filteredusers = this.filteredusers.filter((v) => {
      if(v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;

    console.log("AMIGOS");
    console.log(this.friends);

    if (this.newrequest.sender === this.newrequest.recipient) {
      alert('Este eres tu');
    }
    else {
      let isAlreadyFriend: Boolean = false;
      this.friends.forEach(friend => {
        if (friend.uid == this.newrequest.recipient) {
          isAlreadyFriend = true;
        }
      });

      if (isAlreadyFriend) {
        let failureAlert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Anteriormente agregaste a ' + recipient.displayName,
          buttons: ['ok']
        });
        failureAlert.present();
      } else {
        let successalert = this.alertCtrl.create({
          title: 'Petición enviada',
          subTitle: 'Tu petición ha sido enviada a ' + recipient.displayName,
          buttons: ['ok']
        });
      
        this.requestservice.sendrequest(this.newrequest).then((res: any) => {
          if (res.success) {
            successalert.present();
            let sentuser = this.filteredusers.indexOf(recipient);
            this.filteredusers.splice(sentuser, 1);
          }
        }).catch((err) => {
          alert(err);
        });
      }
    }
  }

}
