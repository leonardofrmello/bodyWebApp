import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExercicioDescPage } from '../exercicio-desc/exercicio-desc';
import { BaseServerProvider } from '../../providers/base-server/base-server';

@IonicPage()
@Component({
  selector: 'page-meus-treinos-detalhe',
  templateUrl: 'meus-treinos-detalhe.html',
})
export class MeusTreinosDetalhePage {

  public listExerc = [];
  public detalhesTreino;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider
    ) {
      this.detalhesTreino = navParams.data;
      this.carregaTreino(navParams.data[0]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusTreinosDetalhePage');
  }

  carregaTreino(id){
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarExecucaoExerciciosTreinos=T&TESTE=S&id="+id).then((result) => {
      this.listExerc.push(result);
      this.listExerc = this.listExerc[0];
    })

  }

  openPage(){
    console.log("troca page");
    this.navCtrl.push(ExercicioDescPage, this.listExerc);
  }

}
