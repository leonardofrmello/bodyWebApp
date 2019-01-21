import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercicioDescPage } from './exercicio-desc';

@NgModule({
  declarations: [
    ExercicioDescPage,
  ],
  imports: [
    IonicPageModule.forChild(ExercicioDescPage),
  ],
})
export class ExercicioDescPageModule {}
