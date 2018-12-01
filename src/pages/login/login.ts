import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
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
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
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
        this.baseService.criaBanco();
        this.navCtrl.push(MainPage);
      }else{
        console.log("bateu no else");

        let alert = this.alertCtrl.create({
          title: 'Atenção',
          message: result[0].MSG,
          buttons: [
            {
              text: 'Ok',
              role: 'Ok',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
          ]
        });
        alert.present();
      }

    }, (err) => {
      this.baseService.showMessage(err.error.text);
    });
  }



}
