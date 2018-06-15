import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EncuestaProvider {

  configurationRoute = firebase.database().ref('/configuration');

  constructor() {
  }

  loadConfigurations(callback) {
    this.configurationRoute.on('value', snapshot => {
      callback(snapshot);
    });
  }
  
  updateConfigurations(toggles) {
    console.log(toggles);
    let preTest = toggles.preTest;
    let postTest = toggles.postTest;
    var promise = new Promise((resolve,reject) => {
      this.configurationRoute.update({
        preTestEnabled: preTest,
        postTestEnabled: postTest
      })
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
    });
    return promise;
  }
}
