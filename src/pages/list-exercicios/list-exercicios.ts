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

  public listExercicios;
  public actionSheet;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public baseService: BaseServerProvider,
    ) {

    this.carregaGruposMusculares();
    //this.carregaListaExercicios();

    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Change the tag of this visitor',
      cssClass: "actionGPMusc"
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListExerciciosPage');
  }

  //Json de lista de grupo muscular
  //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosCat=S

  //Json com todos exercicios
  //Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosTotal


  carregaGruposMusculares(){
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosCat=S", false).then((result) => {
     // this.montaActionSheetGPMusc();

     //, cssClass: data.res[i].style
    console.log(result);
    let dados = result.data;
      for (var i = 0; i < dados.length; i++) {

          this.actionSheet.addButton(
            {
              text: dados[i][1],
              cssClass: "rowActionSheet",
              icon: 'icon-edition',
            }

            );
      }
      this.actionSheet.addButton({text: 'Cancel', 'role': 'cancel' });
      this.actionSheet.present();
    })
  }

  carregaListaExercicios(){

    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarListaExerciciosTotal").then((result : exercicio) => {
      console.log(result);
      this.listExercicios = result.data;
      //console.log(this.listExercicios);
    })

  }

  presentActionSheet(){
    this.actionSheet.present();
  }

  /*montaActionSheetGPMusc(){

    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'ABDOMINAIS',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'BRAÇOS',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'COSTAS',
          handler: () => {
            console.log('Archive clicked');
          }
        },
      ]
    });

    actionSheet.present();

  }*/





//actionSheet.addButton({text: 'Cancel', 'role': 'cancel' });

//actionSheet.present();


  openPage(){
      this.navCtrl.push(ExercicioPage);
  }


}
