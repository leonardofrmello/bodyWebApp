import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExercicioDescPage } from '../exercicio-desc/exercicio-desc';

@IonicPage()
@Component({
  selector: 'page-meus-treinos-detalhe',
  templateUrl: 'meus-treinos-detalhe.html',
})
export class MeusTreinosDetalhePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusTreinosDetalhePage');
  }

  openPage(){
    console.log("troca page");
    this.navCtrl.push(ExercicioDescPage);
  }

}
