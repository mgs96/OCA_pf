import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Calendar } from '@ionic-native/calendar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { EstadosAcademicosPage } from '../pages/estados_academicos/estados_academicos';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalDetailsPage } from '../pages/cal-details/cal-details';
import { AsesoriaAcademicaPage } from "../pages/asesoria-academica/asesoria-academica";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    EstadosAcademicosPage,
    ListPage,
    LoginPage,
    CalendarPage,
<<<<<<< HEAD
    CalDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
=======
    CalDetailsPage,
    AsesoriaAcademicaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
>>>>>>> polo
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EstadosAcademicosPage,
    ListPage,
    LoginPage,
    CalendarPage,
<<<<<<< HEAD
    CalDetailsPage
=======
    CalDetailsPage,
    AsesoriaAcademicaPage
>>>>>>> polo
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Calendar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
