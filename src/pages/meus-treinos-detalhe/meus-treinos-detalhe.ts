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

  public listExerc:any;
  public detalhesTreino;
  public idTreino;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider
    ) {
      this.detalhesTreino = navParams.data;
      this.carregaTreino(navParams.data[0]);
      this.idTreino = navParams.data[0];
  }

  ionViewDidEnter(){
    this.carregaTreino(this.idTreino);
    console.log("chamou didenter");
  }

  carregaTreino(id){
    this.listExerc = [];
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarExecucaoExerciciosTreinos=T&TESTE=S&id="+id).then((result) => {
      this.listExerc.push(result);
      this.listExerc = this.listExerc[0];
    })
  }

  openPage(){
    this.listExerc.idTreino = this.idTreino;
    this.navCtrl.push(ExercicioDescPage, this.listExerc);
  }

  marcaExerc(idTreino, idExerc, idPag, idExeTreino){
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&ExecutarExercTreino=" + idExerc + "&IdTreino=" + idTreino + "&idExeTreino=" +idExeTreino).then((result) => {
      this.carregaTreino(idTreino);
    })
  }

  desmarcaExerc(idTreino,idExec){
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&DesmarcarExercTreino=" + idExec).then((result) => {
      this.carregaTreino(idTreino);
    })
  }

}
