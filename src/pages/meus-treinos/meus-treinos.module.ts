import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusTreinosPage } from './meus-treinos';

@NgModule({
  declarations: [
    MeusTreinosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusTreinosPage),
  ],
})
export class MeusTreinosPageModule {}
