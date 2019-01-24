import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-exercicio-desc',
  templateUrl: 'exercicio-desc.html',
})
export class ExercicioDescPage {

  @ViewChild(Slides) slides: Slides;

  public lista;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams

    ) {

      this.lista = navParams.data.data;
      console.log("valor de lista");
      console.log(this.lista);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercicioDescPage');
  }


  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

}
