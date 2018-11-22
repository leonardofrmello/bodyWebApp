import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MeusTreinosDetalhePage } from '../meus-treinos-detalhe/meus-treinos-detalhe';
import { BaseServerProvider } from '../../providers/base-server/base-server';


@IonicPage()
@Component({
  selector: 'page-meus-treinos',
  templateUrl: 'meus-treinos.html',
})
export class MeusTreinosPage {

  public typeTreino:string = "hoje";
  public treinosAtivos;
  public treinosTodos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
    ) {
      this.carregaTreinos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusTreinosPage');
  }

  carregaTreinos(){


    let url = "Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarTreinosExecucaoTodos=T";
    //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarTreinosExecucaoTodos=T

    //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarExecucaoExerciciosTreinos=T&TESTE=S


    //Pareceee - Ser o json de treinos (mas acredito que tenha outro)
    //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarTreinos=T

    //lista de grupo muscular
    //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosCat=S

    //lista de todos exercicios
    //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosTotal

    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarTreinos=T").then((result) => {
      console.log(result);
    })
  }

  ordenaTreino(data){
    this.treinosTodos = data.data;
    console.log(this.treinosTodos);
  }

  openPage(){
    console.log("troca page");
    this.navCtrl.push(MeusTreinosDetalhePage);
  }

}
