import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Calendar } from '@ionic-native/calendar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { EstadosAcademicosPage } from '../pages/estados_academicos/estados_academicos';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalDetailsPage } from '../pages/cal-details/cal-details';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    EstadosAcademicosPage,
    ListPage,
    LoginPage,
    CalendarPage,
    CalDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EstadosAcademicosPage,
    ListPage,
    LoginPage,
    CalendarPage,
    CalDetailsPage
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
