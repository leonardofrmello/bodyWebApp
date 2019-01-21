import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoPage } from './avaliacao';
import { AmChartsModule } from '@amcharts/amcharts3-angular';

@NgModule({
  declarations: [
    AvaliacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoPage),
    AmChartsModule
  ],
})
export class AvaliacaoPageModule {}
