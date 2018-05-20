import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NrcPage } from './nrc';

@NgModule({
  declarations: [
    NrcPage,
  ],
  imports: [
    IonicPageModule.forChild(NrcPage),
  ],
})
export class NrcPageModule {}
