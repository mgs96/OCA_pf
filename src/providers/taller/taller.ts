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
  private workshop = firebase.database().ref('/workshop');
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

  addAsistente(course, user) {
    var promise = new Promise((resolve, reject) => {
      this.workshop.child(course.nrc).child(user.uid).set({
        name: user.displayName,
        userUid: user.uid,
        photoURL: user.photoURL,
        absence: 0
      })
      .then(() => {
        this.workshopAssistant.child(user.uid).push().set({
          nrc: course.nrc,
          nombreProfesor : course.nombreProfesor,
          nombreCurso: course.nombreCurso,
          numeroSesiones: course.numeroSesiones
        })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
      })
      .catch(error => {
        reject(error);
      });
    });
    return promise;
  }

  listAsistentes(curso, callback) {
    this.workshop.child(curso).on('value', snapshot => {
      callback(snapshot);
    });
  }

  addAbscence(nrcUid, user) {
    console.log(JSON.stringify(user));
    let newAbscence = user.absence + 1;
    var promise = new Promise((resolve, reject) => {
      this.workshop.child(nrcUid).child(user.userUid).update({
        absence: newAbscence
      })
      .then(() => {
        resolve(true);
      })
      .catch(error => reject(error));
    });
    return promise;
  }

  readNrcs(callback, uid = firebase.auth().currentUser) {
    console.log(firebase.auth().currentUser);
    this.nrcs.child(firebase.auth().currentUser.uid).on('value', snapshot => {
      callback(snapshot);
    });
  }

  readAssistants(user_uid, callback) {
    this.workshopAssistant.child(user_uid).on('value', snapshot => {
      callback(snapshot);
    });
  }

}
