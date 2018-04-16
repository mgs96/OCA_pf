import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EstadosAcademicosPage } from '../estados_academicos/estados_academicos';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';


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
    private googlePlus: GooglePlus, private toastCtrl: ToastController, private authService: AuthProvider,
    private userProvider: UserProvider) {
      
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          console.log("onAuthStateChanged");
          console.log(user);
        } 
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
      'webClientId': '779539891707-7f8mv198pfnhh1o9u1lsel00u5qk6k3l.apps.googleusercontent.com',
      'offline': true,
    }).then(res => {
      if(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(uninorte\.edu)\.com$/.test(res.email)) {
        console.log("SOY UNINORTE");
      } else {
        console.log("NO SOY UNINORTE")
      }
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
      this.authService.loginWithGoogle(googleCredential).then(res => {
        this.userProvider.getuserdetails().then((userDetails) => {
          if (userDetails == null) {
            this.userProvider.adduser(firebase.auth().currentUser);
          }
        });
        this.gotoApp();
      }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
  }

  gotoApp() {
    this.navCtrl.setRoot(EstadosAcademicosPage);
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }

}
