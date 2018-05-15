import { Component } from '@angular/core';
import { Events, NavController, ToastController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { StatusProvider } from '../../providers/status/status';


@Component({
  selector: 'page-estados',
  templateUrl: 'estados_academicos.html'
})
export class EstadosAcademicosPage {

  img;

  constructor(
    public navCtrl: NavController, 
    private event:Events, 
    public toast:ToastController, 
    private calendar: Calendar,
    private statusService: StatusProvider,
    private navParams: NavParams
  ) {
    this.img = navParams.data;
    
    this.event.subscribe('hello', (asesoria) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.addEventXD(calendar, asesoria); //This works.
    });
  }

  addEventXD(cal, asesoria) {
    let dateStart = new Date();
    let dateStop = new Date(dateStart.setHours(dateStart.getHours() + 4));
    console.log(dateStart);
    console.log(dateStop);
    let options = { calendarId: cal.id, calendarName: cal.name, url: 'http://example.com', firstRemainderMinutes: 15 };

    this.calendar.createEventInteractivelyWithOptions(asesoria.subject, 'Barranquilla', asesoria.place, 
    asesoria.Inicio, asesoria.Fin, options).then(() => {
    
    });
  }

  addEvent2(asesoria) {
    console.log('Welcome', asesoria);
    let name = asesoria.subject;
    const toast = this.toast.create({
      message: `Hello ${name}`,
      duration: 3000
    });
    toast.present();
  }

}
