import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BaseServerProvider } from '../providers/base-server/base-server';
import { LoginPageModule } from '../pages/login/login.module';
import { MainPageModule } from '../pages/main/main.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ListExerciciosPageModule } from '../pages/list-exercicios/list-exercicios.module';
import { EvolucaoPageModule } from '../pages/evolucao/evolucao.module';
import { MeusTreinosPageModule } from '../pages/meus-treinos/meus-treinos.module';
import { MinhasAvaliacoesPageModule } from '../pages/minhas-avaliacoes/minhas-avaliacoes.module';
import { MeusTreinosDetalhePageModule } from '../pages/meus-treinos-detalhe/meus-treinos-detalhe.module';
import { CadEvolucaoModalPageModule } from '../pages/cad-evolucao-modal/cad-evolucao-modal.module';
import { AvaliacaoPageModule } from '../pages/avaliacao/avaliacao.module';
import { ExercicioDescPageModule } from '../pages/exercicio-desc/exercicio-desc.module';
import { ExercicioPageModule } from '../pages/exercicio/exercicio.module';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    LoginPageModule,
    MainPageModule,
    ProfilePageModule,
    EvolucaoPageModule,
    ListExerciciosPageModule,
    MeusTreinosPageModule,
    MinhasAvaliacoesPageModule,
    MeusTreinosDetalhePageModule,
    CadEvolucaoModalPageModule,
    AvaliacaoPageModule,
    ExercicioDescPageModule,
    ExercicioPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BaseServerProvider,
  ]
})
export class AppModule {}
