// components
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// pages
import { EstadosAcademicosPage } from '../pages/estados_academicos/estados_academicos';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';

import { LoginfbPage } from "../pages/loginfb/loginfb";
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginfbPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Estados académicos', component: EstadosAcademicosPage },
      { title: 'List', component: ListPage },
      { title: 'Calendario', component: CalendarPage },
      { title: 'Chat', component: TabsPage },
      { title: 'Salir', component: LoginPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString("#03b6b3");
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
