import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TallerProvider } from '../../providers/taller/taller';

/**
 * Generated class for the StudentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-list',
  templateUrl: 'student-list.html',
})
export class StudentListPage {
  curso;
  students = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tallerProvider: TallerProvider,
    public alertCtrl: AlertController
  ) {
    this.curso = this.navParams.get('data');
    this.fetch();
  }

  add() {
    this.navCtrl.push('AddStudentPage', { data: this.curso });
  }

  fetch() {
    this.tallerProvider.listAsistentes(this.curso.nrc, snapshot => {
      let students = snapshot.val();
      let tempArray = [];
      for(var key in students) {
        tempArray.push(students[key])
      }
      this.students = tempArray;
      console.log(JSON.stringify(this.students));
    });
  }

  ponerFalla(student) {
    let alert = this.alertCtrl.create({
      title: 'Inasistencia',
      subTitle: `Estas seguro que ${ student.name } faltó a una sesión?`,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log("NOOO");
          }
        },
        {
          text: 'Si',
          handler: () => {
          this.tallerProvider.addAbscence(this.curso.nrc, student);
        }
      }]
    });
    alert.present();
  }

}
