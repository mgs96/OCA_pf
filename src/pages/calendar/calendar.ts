import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { CalDetailsPage } from '../cal-details/cal-details';

import { Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  calendars = [];
  isAdmin = false;

  constructor(public navCtrl: NavController, private toast:ToastController, public navParams: NavParams, private calendar: Calendar, private plt: Platform,
    private event: Events, private userProvider: UserProvider) {
      this.isAdmin = this.userProvider.loguedUser.admin;
      this.plt.ready().then(() => {
        this.calendar.listCalendars().then(data => {
          this.calendars = data;
        });
      });
  }

  addEvent(cal) {
    let dateStart = new Date();
    let dateStop = new Date(dateStart.setHours(dateStart.getHours() + 4));
    console.log(dateStart);
    console.log(dateStop);
    let options = { calendarId: cal.id, calendarName: cal.name, url: 'http://example.com', firstRemainderMinutes: 15 };

    this.calendar.createEventInteractivelyWithOptions('Nuevo Evento', 'Barranquilla', 'Some special notes', dateStart, dateStop, options).then(() => {

    });
  }

  addEvent2(asesoria) {
    console.log('Welcome', asesoria);
    const toast = this.toast.create({
      message: `Hello ${name}`,
      duration: 3000
    });
    toast.present();
  }

  openCal(cal) {
    this.navCtrl.push(CalDetailsPage, { name: cal.name });
  }

}
