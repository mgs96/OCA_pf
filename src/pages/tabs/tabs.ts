import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusProvider } from '../../providers/status/status';
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
  public tabs = [];
  tabsLoaded = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private statusProvider: StatusProvider
  ) {
    statusProvider.loadStatuses().then((ok: any) => {
      this.data = ok.data;
      this.data.forEach(element => {
        let tab = { title: element.name, root: EstadosAcademicosPage, rootParams: element.value };
        this.tabs.push(tab);
        this.tabsLoaded = true;
      });
    }); 
  }

  ionViewDidLoad() {
  }

}
