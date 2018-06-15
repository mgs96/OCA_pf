import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { DocumentSnapshot } from '@firebase/firestore-types';

const configurationRoute = firebase.database().ref('/configuration');

@Injectable()
export class ConfigurationsProvider {

  constructor() {
  }

  loadConfigurations(callback) {
    configurationRoute.on('value', snapshot => {
      callback(snapshot);
    });
  }
  
  updateConfigurations(toggles) {
    let preTest = toggles.pretest;
    let postTest = toggles.postTest;
    var promise = new Promise((resolve,reject) => {
      configurationRoute.update({
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
