import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ExercicioPage } from '../exercicio/exercicio';

@IonicPage()
@Component({
  selector: 'page-list-exercicios',
  templateUrl: 'list-exercicios.html',
})
export class ListExerciciosPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListExerciciosPage');
  }

  presentActionSheet() {
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
  }

  openPage(){
      this.navCtrl.push(ExercicioPage);
  }


}
