import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewNrcPage } from './new-nrc';

@NgModule({
  declarations: [
    NewNrcPage,
  ],
  imports: [
    IonicPageModule.forChild(NewNrcPage),
  ],
})
export class NewNrcPageModule {}
