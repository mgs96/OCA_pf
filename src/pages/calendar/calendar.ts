import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { CalDetailsPage } from '../cal-details/cal-details';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  calendars = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar, private plt: Platform) {
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

    this.calendar.createEventInteractivelyWithOptions('My new Event', 'Baranquilla', 'Some special notes', dateStart, dateStop, options).then(() => {

    });
  }

  openCal(cal) {
    this.navCtrl.push(CalDetailsPage, { name: cal.name });
  }

}
