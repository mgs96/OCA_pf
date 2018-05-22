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

  createNrc(curso: Nrc) {
    var promise = new Promise((resolve, reject) => {
      this.nrcs.child(firebase.auth().currentUser.uid).push().set({
        nrc: curso.nrc,
        nombreCurso: curso.nombreCurso,
        nombreProfesor: firebase.auth().currentUser.displayName,
        numeroSesiones: curso.sesiones
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
      this.workshopAssistant.child(nrcUid).child(user.uid).set({
        name: user.displayName,
        userUid: user.uid,
        photoURL: user.photoURL,
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

  listAsistentes(curso) {
    var promise = new Promise((resolve, reject) => {
      this.workshopAssistant.child(curso).once('value', snapshot => {
        let students = snapshot.val();
        let tempArray = [];
        for(var key in students) {
          tempArray.push(students[key])
        }
        resolve(tempArray);
      })
      .catch(error => reject(error));
    });
    return promise;
  }

  addAbscence(nrcUid, user, absence) {
    let newAbscence = absence + 1;
    var promise = new Promise((resolve, reject) => {
      this.workshopAssistant.child(nrcUid).child(user.uid).update({
        absence: newAbscence
      })
      .then(() => {
        resolve(true);
      })
      .catch(error => reject(error));
    });
    return promise;
  }

  readNrcs() {
    var promise = new Promise((resolve, reject) => {
      this.nrcs.child(firebase.auth().currentUser.uid).once('value', snapshot => {
        let nrcData = snapshot.val();
        let tempArray = [];
        for(var key in nrcData) {
          tempArray.push(nrcData[key])
        }
        resolve(tempArray);
      })
      .catch(error => reject(error));
    });
    return promise;
  }

}
