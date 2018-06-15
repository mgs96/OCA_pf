import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstadosAcademicosPage } from '../estados_academicos/estados_academicos';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';
import { StatusProvider } from '../../providers/status/status';
import { EncuestaProvider } from '../../providers/encuesta/encuesta';

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
    public navParams: NavParams,
    public statusProvider: StatusProvider,
    public encuestaProvider: EncuestaProvider
  ) {
    this.tabs = this.statusProvider.tabs;
  }

  ionViewDidLoad() {
  }

}
