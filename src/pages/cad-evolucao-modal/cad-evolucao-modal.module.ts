import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadEvolucaoModalPage } from './cad-evolucao-modal';

@NgModule({
  declarations: [
    CadEvolucaoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CadEvolucaoModalPage),
  ],
})
export class CadEvolucaoModalPageModule {}
