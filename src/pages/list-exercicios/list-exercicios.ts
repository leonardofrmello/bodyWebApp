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

  }

  ionViewWillEnter(){

    if(localStorage.getItem("listGrupoMusc") != undefined && localStorage.getItem("listGrupoMusc") != ""){

      this.recriarAction(JSON.parse(localStorage.getItem("listGrupoMusc")));

    }else{

      this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosCat=S", false).then((result) => {
        localStorage.setItem("listGrupoMusc", JSON.stringify(result));
        this.recriarAction(result);
      })
    }



  }

  //Json de lista de grupo muscular
  //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosCat=S

  //Json com todos exercicios
  //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosTotal


  //por conta de um erro do action sheet tive que recria-lo
  recriarAction(e){
    if(e == undefined){
      e = JSON.parse(localStorage.getItem("listGrupoMusc"));
    }
    this.actionSheet = "";
    let dados = e.data;
    this.actionSheet = this.actionSheetCtrl.create({
      cssClass: "actionGPMusc"
    });


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

    const filtro = lista.data.filter(function(value){
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

    if(localStorage.getItem("listaExercicios") != undefined && localStorage.getItem("listaExercicios") != ""){
      let dados = JSON.parse(localStorage.getItem("listaExercicios"));
      this.listExercicios = dados.data;
    }else{
      this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosTotal").then((result:any) => {
        localStorage.setItem("listaExercicios", JSON.stringify(result));
        this.listExercicios = result.data;
      })
    }

  }

  openPage(dados){
      this.navCtrl.push(ExercicioPage, dados);
  }


}
