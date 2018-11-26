import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListExerciciosPage } from './list-exercicios';


@NgModule({
  declarations: [
    ListExerciciosPage
  ],
  imports: [
    IonicPageModule.forChild(ListExerciciosPage)
  ],
})
export class ListExerciciosPageModule {}
