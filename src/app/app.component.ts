// components
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// pages
import { EstadosAcademicosPage } from '../pages/estados_academicos/estados_academicos';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';

import { LoginfbPage } from "../pages/loginfb/loginfb";
import { TabsPage } from '../pages/tabs/tabs';

import { AsesoriaAcademicaPage } from "../pages/asesoria-academica/asesoria-academica";
import { Firebase } from '@ionic-native/firebase';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('myNav') navCtrl: NavController;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private firebase: Firebase, private userProvider: UserProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Estados académicos', component: EstadosAcademicosPage },
      { title: 'List', component: ListPage },
      { title: 'Calendario', component: CalendarPage },
      { title: 'Chat', component: TabsPage },
      { title: 'Salir', component: LoginPage },
      { title: 'Calendario', component: CalendarPage },
      { title: 'Asesorías Académicas', component: AsesoriaAcademicaPage }
    ];

    firebase.onNotificationOpen().subscribe(data => {
      this.navCtrl.setRoot('TabsPage');
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString("#00919A");
      this.splashScreen.hide();

      this.firebase.getToken().then(token => {
        this.userProvider.initializeToken(token);
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
