import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServerProvider } from '../../providers/base-server/base-server';

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvaliacaoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
    ) {
  }

  ionViewDidLoad() {

  }


}
