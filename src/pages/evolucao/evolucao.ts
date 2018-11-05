import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { CadEvolucaoModalPage } from '../cad-evolucao-modal/cad-evolucao-modal';

@IonicPage()
@Component({
  selector: 'page-evolucao',
  templateUrl: 'evolucao.html',
})
export class EvolucaoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController

    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvolucaoPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Período',
      buttons: [
        {
          text: '3 Meses',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: '6 Meses',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '12 Meses',
          handler: () => {
            console.log('Archive clicked');
          }
        },
      ]
    });

    actionSheet.present();
  }

  openModal(){
   let contactModal = this.modalCtrl.create(CadEvolucaoModalPage);
   contactModal.present();
  }

}
