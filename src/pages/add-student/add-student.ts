import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { TallerProvider } from '../../providers/taller/taller';
import firebase from "firebase";

/**
 * Generated class for the AddStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-student',
  templateUrl: 'add-student.html',
})
export class AddStudentPage {
  temparr = [];
  filteredusers = [];
  nrc;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userservice: UserProvider,
    public tallerProvider: TallerProvider,
    public alertCtrl: AlertController
  ) {
    this.nrc = this.navParams.get('data');
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    });
  }

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.filteredusers = this.filteredusers.filter((v) => {
      if(v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }

  addStudent(student) {
    let currentUid = firebase.auth().currentUser.uid;
    if(currentUid == student.uid) {
      alert('No puedes agregarte al curso');
    } else {
      this.tallerProvider.addAsistente(this.nrc.nrc, student).then(() => {
        let successalert = this.alertCtrl.create({
          title: 'Estudiante agregado',
          subTitle: `has agregado a ${ student.name } al curso ${ this.nrc.courseName }`,
          buttons: ['ok']
        });
        this.navCtrl.popToRoot();
      });
    }
  }
}
