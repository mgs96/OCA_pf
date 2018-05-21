import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Nrc } from '../../models/nrc';

/*
  Generated class for the TallerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TallerProvider {

  private nrcs = firebase.database().ref('/nrc');
  private workshopAssistant = firebase.database().ref('/workshopAssistant');

  constructor() {
    
  }

  createNrc(nrc: Nrc) {
    let NRC = nrc.nrc.toUpperCase();
    var promise = new Promise((resolve, reject) => {
      this.nrcs.child(firebase.auth().currentUser.uid).push().set({
        nrc: NRC,
        nombreCurso: nrc.nombreCurso,
        nombreProfesor: firebase.auth().currentUser.displayName,
        numeroSesiones: nrc.sesiones
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

  addAsistente(nrcUid, user) {
    var promise = new Promise((resolve, reject) => {
      this.workshopAssistant.child(nrcUid).push().set({
        uid: user.uid,
        absence: 0
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

  readNrcs() {
    var promise = new Promise((resolve, reject) => {
      this.nrcs.once('value', snapshot => {
        let array = [];
        if (snapshot.val() != null) {
          for (const item of snapshot.val()) {
            array.push(item);
          }
        }
        resolve({ data: array });
      })
      .catch(error => reject(error));
    });
    return promise;
  }

}
