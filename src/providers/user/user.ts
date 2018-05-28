import { Injectable } from "@angular/core";
import { database } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  firedata = database().ref("/users/");
  token: string;
  public loguedUser: any;

  constructor(public afireauth: AngularFireAuth) {
    console.log("Hello UserProvider Provider");
  }

  initializeToken(token: string) {
    this.token = token;
  }

  updateToken() {
    this.firedata
      .child(this.afireauth.auth.currentUser.uid)
      .update({ token: this.token });
  }

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser
        .updateProfile({
          displayName: newuser.displayName,
          photoURL: newuser.photoURL
        })
        .then(() => {
          this.firedata
            .child(this.afireauth.auth.currentUser.uid)
            .set({
              uid: this.afireauth.auth.currentUser.uid,
              displayName: newuser.displayName,
              email: newuser.email,
              creationTime: newuser.metadata.creationTime,
              lastSignInTime: newuser.metadata.lastSignInTime,
              phoneNumber: newuser.phoneNumber,
              photoURL: newuser.photoURL,
              token: this.token
            })
            .then(() => {
              resolve({ success: true });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve({ success: true });
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser
        .updateProfile({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl
        })
        .then(() => {
          firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .update({
              displayName: this.afireauth.auth.currentUser.displayName,
              photoURL: imageurl,
              uid: firebase.auth().currentUser.uid
            })
            .then(() => {
              resolve({ success: true });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata
        .child(firebase.auth().currentUser.uid)
        .once("value", snapshot => {
          resolve(snapshot.val());
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser
        .updateProfile({
          displayName: newname,
          photoURL: this.afireauth.auth.currentUser.photoURL
        })
        .then(() => {
          this.firedata
            .child(firebase.auth().currentUser.uid)
            .update({
              displayName: newname,
              photoURL: this.afireauth.auth.currentUser.photoURL,
              uid: this.afireauth.auth.currentUser.uid
            })
            .then(() => {
              resolve({ success: true });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }

  // aqui habría que filtrar segun sean estudiantes o no
  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata
        .orderByChild("uid")
        .once("value", snapshot => {
          let userdata = snapshot.val();
          let temparr = [];
          for (var key in userdata) {
            temparr.push(userdata[key]);
          }
          resolve(temparr);
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }
}
