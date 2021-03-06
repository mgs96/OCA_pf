import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, MenuController } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { EstadosAcademicosPage } from "../estados_academicos/estados_academicos";
import firebase from "firebase";
import { AuthProvider } from "../../providers/auth/auth";
import { UserProvider } from "../../providers/user/user";
import { HomePage } from "../home/home";
import { StatusProvider } from "../../providers/status/status";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  data;
  public tabs = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googlePlus: GooglePlus,
    private toastCtrl: ToastController,
    private authService: AuthProvider,
    private userProvider: UserProvider,
    private menuCtrl: MenuController,
    private statusProvider: StatusProvider
  ) {}

  showToast(name: string) {
    let toast = this.toastCtrl.create({
      message: `Bienvenido ${name}!`,
      duration: 2000,
      position: "bottom"
    });
    toast.present(toast);
  }

  login() {
    console.log("LOGIN!");
    this.googlePlus
      .login({
        webClientId:
          "779539891707-7f8mv198pfnhh1o9u1lsel00u5qk6k3l.apps.googleusercontent.com",
        offline: true
      })
      .then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(
          res.idToken
        );
        this.authService
          .loginWithGoogle(googleCredential)
          .then(res => {
            this.userProvider.getuserdetails().then(userDetails => {
              console.log(firebase.auth().currentUser)
              if (userDetails == null) {
                this.userProvider.adduser(firebase.auth().currentUser);
              }
              this.userProvider.loguedUser = userDetails;
              this.userProvider.updateToken();
            });
            this.menuCtrl.enable(true, 'myMenu');
            this.statusProvider.loadStatuses().then((ok: any) => {
              this.data = ok.data;
              this.data.forEach(element => {
                let tab = { title: element.name, root: EstadosAcademicosPage, rootParams: element.value };
                this.tabs.push(tab);
              });
              this.statusProvider.tabs = this.tabs;
              this.gotoApp();
            }); 
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(JSON.stringify(error)));
  }

  gotoApp() {
    this.navCtrl.setRoot(HomePage, { data: this.tabs });
  }

  passwordreset() {
    this.navCtrl.push("PasswordresetPage");
  }
}
