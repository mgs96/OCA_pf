import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuestionariosPage } from './cuestionarios';

@NgModule({
  declarations: [
    CuestionariosPage,
  ],
  imports: [
    IonicPageModule.forChild(CuestionariosPage),
  ],
})
export class CuestionariosPageModule {}
