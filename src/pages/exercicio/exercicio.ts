import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-exercicio',
  templateUrl: 'exercicio.html',
})
export class ExercicioPage {

  typeImg: String = "exercicio";
  public exercicio;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.exercicio = navParams.data;
    console.log(this.exercicio);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercicioPage');
  }

}
