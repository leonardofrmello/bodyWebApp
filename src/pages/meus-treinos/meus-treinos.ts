import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { MeusTreinosDetalhePage } from '../meus-treinos-detalhe/meus-treinos-detalhe';


@IonicPage()
@Component({
  selector: 'page-meus-treinos',
  templateUrl: 'meus-treinos.html',
})
export class MeusTreinosPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusTreinosPage');
  }

  openPage(){
    console.log("troca page");
    this.navCtrl.push(MeusTreinosDetalhePage);
  }

}
