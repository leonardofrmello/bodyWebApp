import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cad-evolucao-modal',
  templateUrl: 'cad-evolucao-modal.html',
})
export class CadEvolucaoModalPage {

  public userData: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private formBuilder: FormBuilder
    ) {
      this.userData = this.formBuilder.group({
        peso: new FormControl('', [Validators.required, Validators.minLength(6)]),
        altura: new FormControl('', [Validators.required, Validators.minLength(6)]),
        cintura: new FormControl('', [Validators.required, Validators.minLength(6)]),
        quadril: new FormControl('', [Validators.required, Validators.minLength(6)]),
        gordura: new FormControl('', [Validators.required, Validators.minLength(6)]),
        /*username: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),*/
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadEvolucaoModalPage');
  }

  closeModal(){
    this.view.dismiss();
  }

}
