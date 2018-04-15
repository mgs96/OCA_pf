// angular
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// ionic
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Calendar } from '@ionic-native/calendar';
import { File } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";

//firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { config } from './app.firebaseconfig';
import { HttpModule } from '@angular/http';

// pages
import { MyApp } from './app.component';
import { EstadosAcademicosPage } from '../pages/estados_academicos/estados_academicos';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalDetailsPage } from '../pages/cal-details/cal-details';
import { LoginfbPage } from '../pages/loginfb/loginfb';

// providers
import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { UserProvider } from '../providers/user/user';
import { LoginfbPageModule } from '../pages/loginfb/loginfb.module';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { AsesoriaAcademicaPage } from "../pages/asesoria-academica/asesoria-academica";

@NgModule({
  declarations: [
    MyApp,
    EstadosAcademicosPage,
    ListPage,
    LoginPage,
    CalendarPage,
    CalDetailsPage,
    AsesoriaAcademicaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { tabsPlacement: 'bottom' }),
    AngularFireModule.initializeApp(config),
    TabsPageModule,
    LoginfbPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EstadosAcademicosPage,
    ListPage,
    LoginPage,
    CalendarPage,
    CalDetailsPage,
    LoginfbPage,
    TabsPage,
    AsesoriaAcademicaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Calendar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    UserProvider,
    ImghandlerProvider,
    File,
    FileChooser,
    FilePath,
    RequestsProvider,
    ChatProvider
  ]
})
export class AppModule {}
