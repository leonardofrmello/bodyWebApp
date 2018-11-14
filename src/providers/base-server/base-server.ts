import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Pessoa } from '../../models/Pessoa';

@Injectable()
export class BaseServerProvider {

  private basePath: string;
  public loader;
  public banco:string = "&bd=905";
  constructor(
    public http: HttpClient,
    public events: Events,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    if(this.platform.is("cordova")){
      this.basePath = "http://bodyweb.dragon296.startdedicated.com/Api/";
    } else {
      this.basePath = "http://bodyweb.dragon296.startdedicated.com/Api/";
    }
  }

  public createUserSession(session: Pessoa) {
    localStorage.setItem("userSession", JSON.stringify(session));
    this.events.publish('user:created');
  }

  public postData(page: string, load?: boolean) {
    this.Loading(1, load);

    //credentials["functionPage"] = type;
    //credentials["userSession"] = JSON.parse(localStorage.getItem("userSession"));
    return new Promise((resolve, reject) => {
      this.http.jsonp(this.basePath + "/" + page + this.banco, "callback=JSON_CALLBACK")
      .subscribe(data =>{ this.Loading(0, load);
          try {
            resolve(data);
            console.log("entrou try");
          } catch (e) {
            console.log("entrou catch");
            reject(data["_body"]);
          }
        },err => { this.Loading(0, load);
          console.log("entrou erro");
          reject(err);
      });
    });
  }

  public showMessage(message: string, title?: string) {
    let alert = this.alertCtrl.create({
      title: title ? title : 'Atenção',
      subTitle: message, buttons: ['OK']
    });
    alert.present();
  }

  public Loading(op: number, load: boolean = true) {
    if (op == 0 && load) {
      this.loader.dismiss();
    } else if (op == 1 && load) {
      this.loader = this.loadingCtrl.create();
      this.loader.present();
    }
  }

  //let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

}
