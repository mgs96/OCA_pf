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
        let array = [];
        for (const key in snapshot.val()) {
          if (snapshot.val().hasOwnProperty(key)) {
            let element = {
              value: "",
              name: ""
            };
            element.value = snapshot.val()[key];
            element.name = key;
            array.push(element);
          }
        }
        //console.log(JSON.stringify(array));
        resolve({ data: array });
      })
      .catch((error) => {
        reject(error);
      });
    });
    return promise;
  }

}
