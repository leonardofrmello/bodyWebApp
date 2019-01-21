import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusTreinosDetalhePage } from './meus-treinos-detalhe';

@NgModule({
  declarations: [
    MeusTreinosDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(MeusTreinosDetalhePage),
  ],
})
export class MeusTreinosDetalhePageModule {}
