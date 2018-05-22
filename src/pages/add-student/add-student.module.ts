import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddStudentPage } from './add-student';

@NgModule({
  declarations: [
    AddStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddStudentPage),
  ],
})
export class AddStudentPageModule {}
