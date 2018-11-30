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



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, component: any, icon: string}>;
  public userSession: Pessoa;
  public foto: string;
  public nome: string;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public baseService: BaseServerProvider
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'Página Inicial', component: MainPage, icon: 'home' },
      { title: 'Perfil', component: ProfilePage, icon: 'person' },
      { title: 'Meus Treinos', component: MeusTreinosPage, icon: 'ios-create-outline' },
      { title: 'Minhas Avaliaçoes', component: MinhasAvaliacoesPage, icon: 'ios-paper-outline' },
      { title: 'Lista de Exercicios', component: ListExerciciosPage, icon: 'ios-list-box-outline' },
      { title: 'Evoluçao', component: EvolucaoPage, icon: 'md-podium' },
    ];

    events.subscribe('user:created', () => {
      this.userSession = JSON.parse(localStorage.getItem("userSession"));
    });

    events.subscribe('user:Logout', () => {
      localStorage.removeItem("userSession");
      this.userSession = undefined;
    });

    events.subscribe('user:foto', () => {
      let dados = JSON.parse(localStorage.getItem("JsonPerfil"));
      this.foto = "http://finance.dragon296.startdedicated.com/Pessoas/"+this.baseService.dataBase+"/Clientes/"+dados.IDALUNO+".png";
      this.nome = dados.NOME;
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

    if(JSON.parse(localStorage.getItem("JsonPerfil")) != undefined){
      let dados = JSON.parse(localStorage.getItem("JsonPerfil"));
      this.foto = "http://finance.dragon296.startdedicated.com/Pessoas/"+this.baseService.dataBase+"/Clientes/"+dados.IDALUNO+".png";
      this.nome = dados.NOME;
    }
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  public presentLogout() {
    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }
}


