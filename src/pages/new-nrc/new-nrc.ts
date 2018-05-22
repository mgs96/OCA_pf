import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Nrc } from '../../models/nrc';
import { TallerProvider } from '../../providers/taller/taller';

/**
 * Generated class for the NewNrcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-nrc',
  templateUrl: 'new-nrc.html',
})
export class NewNrcPage {
  nrc: Nrc;
  nrcForm: FormGroup;
  buttonClicked: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public tallerProvider: TallerProvider
  ) {
    this.nrc = this.navParams.get('nrc');
    this.nrcForm = this.formBuilder.group(this.nrc);
  }

  create() {
    this.buttonClicked = true;
    Object.assign(this.nrc, this.nrcForm.value);
    this.tallerProvider.createNrc(this.nrc).then(() => {
      this.navCtrl.popToRoot();
    });
  }

}
