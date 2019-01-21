import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BaseServerProvider } from '../providers/base-server/base-server';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { Pessoa } from '../models/Pessoa';
import { MeusTreinosPage } from '../pages/meus-treinos/meus-treinos';
import { MinhasAvaliacoesPage } from '../pages/minhas-avaliacoes/minhas-avaliacoes';
import { ListExerciciosPage } from '../pages/list-exercicios/list-exercicios';
import { EvolucaoPage } from '../pages/evolucao/evolucao';


declare var wkWebView: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, component: any, icon: string, variavel: any}>;
  public userSession: Pessoa;
  public foto: string;
  public nome: string;
  public qntTreino = 0;
  public qntAval = 0;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public baseService: BaseServerProvider
  ) {

    this.initializeApp();
    this.pages = [
      { title: 'Página Inicial', component: MainPage, icon: 'home', variavel: "" },
      { title: 'Perfil', component: ProfilePage, icon: 'person', variavel: "" },
      { title: 'Meus Treinos', component: MeusTreinosPage, icon: 'ios-create-outline', variavel: "0"},
      { title: 'Minhas Avaliaçoes', component: MinhasAvaliacoesPage, icon: 'ios-paper-outline', variavel: "0" },
      { title: 'Lista de Exercicios', component: ListExerciciosPage, icon: 'ios-list-box-outline', variavel: "" },
      { title: 'Evoluçao', component: EvolucaoPage, icon: 'md-podium', variavel: "" },
    ];

    document.addEventListener('deviceready', () => {
      console.log("leu o device ready");
      wkWebView.injectCookie('http://bodyweb.dragon296.startdedicated.com/');
    });

    events.subscribe('user:created', () => {
      this.userSession = JSON.parse(localStorage.getItem("userSession"));
    });

    events.subscribe('user:Logout', () => {
      localStorage.removeItem("userSession");
      this.userSession = undefined;
    });

    events.subscribe('user:foto', () => {
      let dados = JSON.parse(localStorage.getItem("JsonPerfil"));
      this.nome = dados.NOME;
      this.foto = "http://finance.dragon296.startdedicated.com/Pessoas/"+this.baseService.dataBase+"/Clientes/"+dados.IDALUNO+".png";
    });

    this.events.subscribe('user:qntAval', () => {
      let qnt = JSON.parse(localStorage.getItem("listaAvaliacoes")).data.length;
      console.log(qnt);
      this.qntTreino = 5;
    });

  }


  initializeApp() {
    this.platform.ready().then(() => {
      if(localStorage.getItem("token") == null) {
        this.rootPage = LoginPage;
      } else {
        //this.userSession = JSON.parse(localStorage.getItem("userSession"));
        this.rootPage = MainPage;
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.validSession();
  }

  validSession(){

    let token = localStorage.getItem("token");

    if(token != "" && token != undefined){

      this.baseService.postData(`Perfil/PerfilAjax.php?callback=JSON_CALLBACK&VersaoApp=2.2.0&ValidaLogin=C&cookie=${token}`).then((result) => {
        if(result[0].ISVALID == "S"){
          console.log(result);
          console.log("criar o banco");
          this.baseService.criaBanco();
        }else{
          this.nav.setRoot(LoginPage);
        }

      }, (err) => {
        this.baseService.showMessage(err.error.text);
      });

    }

  }

  update(){
    this.baseService.criaBanco();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  presentLogout() {

    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }

}


