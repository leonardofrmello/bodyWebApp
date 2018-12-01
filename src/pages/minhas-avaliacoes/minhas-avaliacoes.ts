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

  public listAval;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
    ) {

  }

  ionViewDidLoad() {
    this.carregarAvaliacoes();
  }

  openPage(dados){
    this.navCtrl.push(AvaliacaoPage, dados);
  }

  carregarAvaliacoes(){

    if(localStorage.getItem("listaAvaliacoes") != "" && localStorage.getItem("listaAvaliacoes") != undefined){
      this.listAval = JSON.parse(localStorage.getItem("listaAvaliacoes")).data;
    }else{
      this.baseService.postData("Avaliacoes/AvaliacaoAjax.php?callback=JSON_CALLBACK&BuscarAvaliacoes=T").then((result:any) => {
        localStorage.setItem("listaAvaliacoes", JSON.stringify(result));
        this.listAval = result.data;
      })
    }

  }

}
