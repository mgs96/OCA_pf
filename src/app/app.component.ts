// components
import { Component, ViewChild, NgZone } from "@angular/core";
import { Nav, Platform, NavController, ViewController, MenuController, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { GooglePlus } from "@ionic-native/google-plus";

// pages
import { EstadosAcademicosPage } from "../pages/estados_academicos/estados_academicos";
import { ListPage } from "../pages/list/list";
import { LoginPage } from "../pages/login/login";
import { CalendarPage } from "../pages/calendar/calendar";

import { LoginfbPage } from "../pages/loginfb/loginfb";
import { TabsPage } from "../pages/tabs/tabs";

import { AsesoriaAcademicaPage } from "../pages/asesoria-academica/asesoria-academica";
import { Firebase } from "@ionic-native/firebase";
import { UserProvider } from "../providers/user/user";
import firebase from "firebase";
import { ChatProvider } from "../providers/chat/chat";
import { ChatsPage } from "../pages/chats/chats";
import { StatusProvider } from '../providers/status/status';
import { HomePage } from "../pages/home/home";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild("myNav") navCtrl: NavController;

  rootPage: any;
  avatar: string;
  displayName: string;
  public tabs = [];
  data;

  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private firebaseCloudMessage: Firebase,
    private userProvider: UserProvider,
    private chatProvider: ChatProvider,
    public zone: NgZone,
    private googlePlus: GooglePlus,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private statusProvider: StatusProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Nuestras Redes", component: HomePage },
      { title: "Estados académicos", component: TabsPage },
      { title: "Calendario", component: CalendarPage },
      { title: "Chat", component: ChatsPage },
      { title: "Apoyos Académicos", component: AsesoriaAcademicaPage }
    ];
  }

  initializeApp() {
    this.platform
      .ready()
      .then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.backgroundColorByHexString("#00919A");

        this.firebaseCloudMessage.getToken().then(token => {
          this.userProvider.initializeToken(token);
        });

        this.verifyLogin()
          .then(
            ok => {
              this.statusProvider.loadStatuses().then((ok: any) => {
                this.data = ok.data;
                this.data.forEach(element => {
                  let tab = { title: element.name, root: EstadosAcademicosPage, rootParams: element.value };
                  this.tabs.push(tab);
                });
                this.rootPage = HomePage;
                this.menuCtrl.enable(true, 'myMenu');
              }); 
            },
            notOk => {
              this.rootPage = LoginPage;
              this.menuCtrl.enable(false, 'myMenu');
            }
          )
          .then(() => {
            this.firebaseCloudMessage.onNotificationOpen().subscribe(data => {
              if (data.tap) {
                this.chatProvider.initializebuddy(JSON.parse(data.user));
                this.navCtrl.setRoot(ChatsPage);
                // this.navCtrl.setPages(
                //   [{ page: "TabsPage" }, { page: "BuddychatPage" }],
                //   { animate: true }
                // );
              } else {
                if (this.navCtrl.getActive().name != "TabsPage") {
                  const toast = this.toastCtrl.create({
                    message: `Tienes un nuevo mensaje de ${ data.user.displayName }`,
                    duration: 2000,
                    position: 'bottom'
                  });
                  toast.present();              
                }
              }
            });
          });
      })
      .then(() => {
        this.splashScreen.hide();
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, { data: this.tabs });
  }

  verifyLogin() {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.displayName = user.displayName;
          this.avatar = user.photoURL;
          resolve(true);
        } else {
          reject(true);
        }
      });
    });
    return promise;
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.googlePlus.logout().then(() => {
        this.navCtrl.setRoot(LoginPage);
        this.menuCtrl.enable(false, 'myMenu');
      });
    });
  }

  loaduserdetails(): any {
    this.userProvider.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      });
    });
  }
}
