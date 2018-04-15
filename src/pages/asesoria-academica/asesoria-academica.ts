import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { PRUEBAS } from "../../data/data.prueba";
import 'rxjs/add/operator/map'
import { Events } from 'ionic-angular';
import { IAsesoriaAcademica } from "../../interfaces/asesoriaAcademica.interface";
import { CalendarPage } from "../calendar/calendar";

@Component({
  selector: 'page-asesoria-academica',
  templateUrl: 'asesoria-academica.html',
})
export class AsesoriaAcademicaPage {

  asesorias2: null;
  asesorias: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, private http: Http) {
    this.asesorias = PRUEBAS;
    this.http.get('https://oca-pf-back.herokuapp.com/api/v1/apoyos/index').map(res => res.json()).subscribe(data => {
      this.asesorias2 = data.data;
      console.log(this.asesorias2);
      //console.log(this.asesorias2[0].subject);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsesoriaAcademicaPage');
  }

  addAgenda(asesoria) {
    //Crear la agenda con los datos del Card.
    console.log(asesoria.subject, asesoria.strategy); //Comprobar resultados.
    this.events.publish('hello', asesoria);
  }

}
