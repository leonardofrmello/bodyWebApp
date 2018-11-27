import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvaliacaoPage } from '../avaliacao/avaliacao';
import { BaseServerProvider } from '../../providers/base-server/base-server';

@IonicPage()
@Component({
  selector: 'page-minhas-avaliacoes',
  templateUrl: 'minhas-avaliacoes.html',
})
export class MinhasAvaliacoesPage {

  public listAval = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
    ) {

  }

  ionViewDidLoad() {
    this.carregarAvaliacoes();
  }

  openPage(){
    this.navCtrl.push(AvaliacaoPage);
  }

  carregarAvaliacoes(){
    this.baseService.postData("Avaliacoes/AvaliacaoAjax.php?callback=JSON_CALLBACK&BuscarAvaliacoes=T").then((result) => {
      this.listAval.length = 0;
      this.listAval.push(result);
      this.listAval = this.listAval[0].data;
      console.log(this.listAval);
    })
  }

}
