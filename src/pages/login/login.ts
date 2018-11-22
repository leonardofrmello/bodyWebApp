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
      username: new FormControl('leonardofrmello@hotmail.com', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('02021989', [Validators.required, Validators.minLength(6)]),
    });
  }

  ionViewDidEnter() {
    setTimeout(() => { this.events.publish('user:Logout');}, 1000);
  }

  public singIn(userData) {
    var dados = userData.value;
    this.baseService.postData(`Perfil/PerfilAjax.php?callback=JSON_CALLBACK&VersaoApp=2.2.0&ValidaLogin=S&user=${dados.username}&password=${dados.password}`).then((result) => {
      if(result[0].ISVALID == "S"){
        console.log(result);
        localStorage.setItem("token", result[0].COOKIE);
        this.baseService.MontaBanco();
        this.navCtrl.push(MainPage);
      }else{
        /*ons.notification.alert({message: response[0].MSG, title: "Atenção"});
        delete $window.localStorage.token;
        $window.location = "login.html";*/
      }

    }, (err) => {
      this.baseService.showMessage(err.error.text);
    });
  }

}
