import { Injectable } from '@angular/core';
import firebase from 'firebase';

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

  createNrc(nrc: string, nombreCurso: string, nombreProfesor: string, numeroSesiones: number) {
    let NRC = nrc.toUpperCase();
    var promise = new Promise((resolve, reject) => {
      this.nrcs.child(firebase.auth().currentUser.uid).push().set({
        nrc: NRC,
        nombreCurso: nombreCurso,
        nombreProfesor: nombreProfesor,
        numeroSesiones: numeroSesiones
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

}
