// angular
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeCo from '@angular/common/locales/es-CO';

// ionic
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Calendar } from '@ionic-native/calendar';
import { File } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";

registerLocaleData(localeCo, 'co');

//firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { config } from './app.firebaseconfig';
import { HttpModule } from '@angular/http';
import { Firebase } from '@ionic-native/firebase';
import firebase from 'firebase';

// pages
import { MyApp } from './app.component';
import { EstadosAcademicosPage } from '../pages/estados_academicos/estados_academicos';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalDetailsPage } from '../pages/cal-details/cal-details';
import { LoginfbPage } from '../pages/loginfb/loginfb';
import { ChatsPage } from '../pages/chats/chats';

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
import { NotificationProvider } from '../providers/notification/notification';
import { StatusProvider } from '../providers/status/status';
import { SafeImagePipe } from '../pipes/safe-image/safe-image';
import { HomePage } from '../pages/home/home';
import { CuestionariosPage } from '../pages/cuestionarios/cuestionarios';
import { PreTestPage } from '../pages/pre-test/pre-test';
import { ProsTestPage } from '../pages/pros-test/pros-test';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { TallerProvider } from '../providers/taller/taller';
import { NrcPage } from '../pages/nrc/nrc';
import { NewNrcPageModule } from '../pages/new-nrc/new-nrc.module';
import { StudentListPage } from '../pages/student-list/student-list';
import { StudentListPageModule } from '../pages/student-list/student-list.module';
import { AddStudentPageModule } from '../pages/add-student/add-student.module';
import { EncuestaProvider } from '../providers/encuesta/encuesta';

@NgModule({
  declarations: [
    MyApp,
    EstadosAcademicosPage,
    ListPage,
    LoginPage,
    CalendarPage,
    CalDetailsPage,
    AsesoriaAcademicaPage,
    SafeImagePipe,
    ChatsPage,
    HomePage,
    CuestionariosPage,
    PreTestPage,
    ProsTestPage,
    NrcPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { tabsPlacement: 'bottom' }),
    AngularFireModule.initializeApp(config),
    TabsPageModule,
    LoginfbPageModule,
    HttpModule,
    NewNrcPageModule,
    AddStudentPageModule
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
    AsesoriaAcademicaPage,
    ChatsPage,
    HomePage,
    CuestionariosPage,
    PreTestPage,
    ProsTestPage,
    NrcPage,
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
    ChatProvider,
    Firebase,
    NotificationProvider,
    StatusProvider,
    InAppBrowser,
    TallerProvider,
    EncuestaProvider
  ]
})
export class AppModule {}
