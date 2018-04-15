import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { CalDetailsPage } from '../cal-details/cal-details';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
=======
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { CalDetailsPage } from '../cal-details/cal-details';

import { Events } from 'ionic-angular';
>>>>>>> polo

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  calendars = [];
<<<<<<< HEAD

  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar, private plt: Platform) {
=======
  isAdmin = false;

  constructor(public navCtrl: NavController, private toast:ToastController, public navParams: NavParams, private calendar: Calendar, private plt: Platform,
    private event: Events) {
>>>>>>> polo
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

<<<<<<< HEAD
    this.calendar.createEventInteractivelyWithOptions('My new Event', 'Baranquilla', 'Some special notes', dateStart, dateStop, options).then(() => {
=======
    this.calendar.createEventInteractivelyWithOptions('Nuevo Evento', 'Barranquilla', 'Some special notes', dateStart, dateStop, options).then(() => {
>>>>>>> polo

    });
  }

<<<<<<< HEAD
=======
  addEvent2(asesoria) {
    console.log('Welcome', asesoria);
    const toast = this.toast.create({
      message: `Hello ${name}`,
      duration: 3000
    });
    toast.present();
  }

>>>>>>> polo
  openCal(cal) {
    this.navCtrl.push(CalDetailsPage, { name: cal.name });
  }

<<<<<<< HEAD
=======
  changeAdmin() {
    if (this.isAdmin) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }

  }

>>>>>>> polo
}
