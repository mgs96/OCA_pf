import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstadosAcademicosPage } from '../estados_academicos/estados_academicos';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';
import { StatusProvider } from '../../providers/status/status';

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
    public statusProvider: StatusProvider
  ) {
    //this.tabs = this.navParams.get('data');
    //this.tabs = JSON.parse(window.localStorage.getItem('tabs'));
    this.tabs = this.statusProvider.tabs;
  }

  ionViewDidLoad() {
  }

}
