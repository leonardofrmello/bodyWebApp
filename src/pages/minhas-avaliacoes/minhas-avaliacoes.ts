import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvaliacaoPage } from '../avaliacao/avaliacao';

@IonicPage()
@Component({
  selector: 'page-minhas-avaliacoes',
  templateUrl: 'minhas-avaliacoes.html',
})
export class MinhasAvaliacoesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasAvaliacoesPage');
  }

  openPage(){
    this.navCtrl.push(AvaliacaoPage);
  }

}
