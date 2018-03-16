import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EstadosAcademicosPage } from '../estados_academicos/estados_academicos';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  idToken: any;

  api1 = 'http://172.17.68.167:3000/api/v1/google_auth';
  api2 = 'https://rails-api-seed.herokuapp.com/mobile/google_auth';

  isLoggedIn: boolean = false;

  constructor(public navCtrl    : NavController, public navParams: NavParams, private http: HttpClient,
              private googlePlus: GooglePlus, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // this.googlePlus.trySilentLogin({})
    //   .then(res => {
    //     console.log(JSON.stringify(res));
    //     this.displayName = res.displayName;
    //     this.email = res.email;
    //     this.familyName = res.familyName;
    //     this.givenName = res.givenName;
    //     this.userId = res.userId;
    //     this.imageUrl = res.imageUrl;
    //     this.idToken = res.idToken;

    //     this.isLoggedIn = true;

    //     this.gotoApp();

    //     // const httpOptions = {
    //     //   headers: new HttpHeaders({
    //     //     'Access-Control-Allow-Origin': '*'
    //     //   }),
    //     //   params: {
    //     //     'id_token': res.idToken,
    //     //     'redirect_uri': ''
    //     //   }
    //     // };
    //     // this.http.post(this.api1, {} , httpOptions)
    //     //   .subscribe(ok => console.log(JSON.stringify(ok), err => console.log(JSON.stringify(err))));
    //   })
    //   .catch(err => console.log(JSON.stringify(err)));
  }

  showToast(name: string) {
    let toast = this.toastCtrl.create({
      message: `Bienvenido ${ name }!`,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

  login() {

    this.googlePlus.login({
      'webClientId': '779539891707-bqf4tv918qpvopt9abdkm89csma2f8tb.apps.googleusercontent.com',
      'offline': true,
    })
      .then(res => {

        this.showToast(res.givenName);
        this.isLoggedIn = true;

        //this.gotoApp();

        const httpOptions = {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }),
          params: {
            'id_token': res.idToken,
            'redirect_uri': ''
          }
        };

        this.http.post(this.api1, {} , httpOptions)
          .subscribe(ok => console.log(JSON.stringify(ok)), err => console.log(err));
      })
      .catch(err => console.log(JSON.stringify(err)));
  }

  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;

        console.log(JSON.stringify(res));
        
      })
      .catch(err => console.log(err));
  }

  gotoApp() {
    this.navCtrl.setRoot(EstadosAcademicosPage);
  }

}
