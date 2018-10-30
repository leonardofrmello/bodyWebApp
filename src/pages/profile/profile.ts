import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pessoa } from '../../models/Pessoa';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public userSession: FormGroup;
  public edit: boolean;
  public user: Pessoa;
  public img: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.cancelar();
    this.userSession = new FormGroup({
      /*name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
      email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      celular: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(14)]),
      endereco: new FormControl('', [Validators.required, Validators.maxLength(1024)]),
      oferta: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),*/
      //img: new FormControl(this.user.img),
    });
  }

  public editUser() {
    this.edit = true;
  }

  public cancelar() {
    this.user = JSON.parse(localStorage.getItem("userSession"));
    //this.img = this.user.img;
    this.edit = false;
  }
}
