import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseServerProvider } from '../../providers/base-server/base-server';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public userData: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
    public events: Events,
    private formBuilder: FormBuilder
  ) {
    this.userData = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

      /*username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),*/
    });
  }

  ionViewDidEnter() {
    setTimeout(() => { this.events.publish('user:Logout');}, 1000);
  }

  public singIn(userData) {
    this.navCtrl.setRoot(MainPage);
    /*this.baseService.postData(userData.value, "signup", "LightApi").then((result: Pessoa) => {
      this.baseService.createUserSession(result);
      this.navCtrl.setRoot(MainPage);
    }, (err) => {
      this.baseService.showMessage(err.error.text);
    });*/
  }

}
