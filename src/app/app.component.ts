// components
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, ViewController } from 'ionic-angular';
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
import firebase from 'firebase';
import { ChatProvider } from '../providers/chat/chat';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('myNav') navCtrl: NavController;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private firebaseCloudMessage: Firebase, private userProvider: UserProvider, private chatProvider: ChatProvider) {
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

    firebaseCloudMessage.onNotificationOpen().subscribe(data => {
      if (data.tap) {
        chatProvider.initializebuddy(JSON.parse(data.user));
        this.navCtrl.setPages([{page: 'TabsPage'}, {page: 'BuddychatPage'}], {animate: true});
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString("#00919A");
      this.splashScreen.hide();

      this.firebaseCloudMessage.getToken().then(token => {
        this.userProvider.initializeToken(token);
      });

      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.rootPage = EstadosAcademicosPage;
        } else {
          this.rootPage = LoginPage;
        }
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
