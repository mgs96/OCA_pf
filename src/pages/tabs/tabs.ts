import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstadosAcademicosPage } from '../estados_academicos/estados_academicos';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  data;
  tabsLoaded = false;
  tabs = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.tabs = this.navParams.get('data');
  }

  ionViewDidLoad() {
  }

}
