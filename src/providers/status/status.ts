import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the StatusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StatusProvider {

  private statuses = firebase.database().ref('/status');

  constructor() {
    
  }

  loadStatuses () {
    var promise = new Promise((resolve, reject) => {
      this.statuses.once('value', snapshot => {
        resolve({ data: snapshot.val() });
      })
      .catch((error) => {
        reject(error);
      });
    });
    return promise;
  }

}
