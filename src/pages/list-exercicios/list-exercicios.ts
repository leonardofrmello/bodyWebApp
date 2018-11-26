import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ExercicioPage } from '../exercicio/exercicio';
import { BaseServerProvider } from '../../providers/base-server/base-server';

@IonicPage()
@Component({
  selector: 'page-list-exercicios',
  templateUrl: 'list-exercicios.html',
})
export class ListExerciciosPage {

  public listExercicios = [];
  public actionSheet;
  public botoes;
  public gpMusc = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public baseService: BaseServerProvider,
    ) {

    this.carregaListaExercicios();

    this.actionSheet = this.actionSheetCtrl.create({
      cssClass: "actionGPMusc"
    });

  }

  ionViewDidLoad() {

  }

  ionViewWillEnter(){

    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosCat=S", false).then((result) => {

      this.gpMusc.push(result);
      console.log("vallor de gp musc");
      console.log(this.gpMusc);

      let dados = this.gpMusc[0].data;
      localStorage.setItem("botoesAction", JSON.stringify(dados));

        for (var i = 0; i < dados.length; i++) {
            let data = dados[i];
            this.actionSheet.addButton(
              {
                text: dados[i][1],
                cssClass: "title-img"+dados[i][0],
                handler: () => {
                  console.log(data);
                  this.filtraExercicios(data[0]);
                }
              }

            );
        }
      })

  }
  //Json de lista de grupo muscular
  //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosCat=S

  //Json com todos exercicios
  //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosTotal


  //por conta de um erro do action sheet tive que recria-lo
  recriarAction(){
    this.actionSheet = "";

    this.actionSheet = this.actionSheetCtrl.create({
      cssClass: "actionGPMusc"
    });

    let dados = JSON.parse(localStorage.getItem("botoesAction"));

    for (var i = 0; i < dados.length; i++) {
      let data = dados[i];
      this.actionSheet.addButton(
        {
          text: dados[i][1],
          cssClass: "title-img"+dados[i][0],
          handler: () => {
            console.log(data);
            this.filtraExercicios(data[0]);
          }
        }

      );
  }

    this.actionSheet.present();

  }

  filtraExercicios(gpMusc){

    let lista = JSON.parse(localStorage.getItem("listaExercicios"));

    const filtro = lista.filter(function(value){
      return value[3] === gpMusc;
    })

    let dados = {
      "data" : filtro
    }

    this.listExercicios = [];
    this.listExercicios.push(dados);
    this.listExercicios = this.listExercicios[0];

  }

  carregaListaExercicios(){
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosTotal").then((result) => {
      this.listExercicios.push(result);
      localStorage.setItem("listaExercicios", JSON.stringify(this.listExercicios[0].data));
      this.listExercicios = this.listExercicios[0];
    })
  }

  openPage(dados){
      this.navCtrl.push(ExercicioPage, dados);
  }


}
