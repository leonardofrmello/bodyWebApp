import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { BaseServerProvider } from '../../providers/base-server/base-server';


@IonicPage()
@Component({
  selector: 'page-exercicio-desc',
  templateUrl: 'exercicio-desc.html',
})
export class ExercicioDescPage {

  @ViewChild(Slides) slides: Slides;

  public lista;
  public idTreino;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider
    ) {
      console.log("---valor de navparams------");
      console.log(navParams);
      this.idTreino = navParams.data.idTreino;
      this.lista = navParams.data.data;
      console.log("valor de lista slier");
      console.log(this.lista);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercicioDescPage');
  }

  ionViewWillLeave () {
    console.log ("Parece que estou prestes a sair :(");
  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }
  carregaTreino(id){
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarExecucaoExerciciosTreinos=T&TESTE=S&id="+id).then((result:any) => {
      this.lista = result.data;
    })
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
