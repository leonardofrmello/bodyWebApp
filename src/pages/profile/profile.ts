import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServerProvider } from '../../providers/base-server/base-server';
import { Pessoa } from '../../models/Pessoa';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public dados: Pessoa;
  public foto: string;
  public nome: string;
  public email: string;
  public sexo: string;
  public celular: string;
  public estadoCivil: string;
  public dtNasc: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
  ) {
    this.carregaDadosPerfil();
  }

  carregaDadosPerfil(){

    if(localStorage.getItem("JsonPerfil") != null){
      this.dados = JSON.parse(localStorage.getItem("JsonPerfil"));
      this.foto = "http://finance.dragon296.startdedicated.com/Pessoas/"+this.baseService.dataBase+"/Clientes/"+this.dados.IDALUNO+".png";
      this.nome = this.dados.NOME;
      this.email= this.dados.EMAIL;
      this.sexo= this.dados.SEXO;
      this.celular= this.dados.CEL;
      this.estadoCivil= this.dados.ESTCIVIL
      this.dtNasc= this.dados.DTNASC;
    }else{
      this.baseService.postData("Perfil/PerfilAjax.php?callback=JSON_CALLBACK&BuscaPerfil=S").then((result : Pessoa) => {
        this.dados = result[1];
        this.foto = "http://finance.dragon296.startdedicated.com/Pessoas/"+this.baseService.dataBase+"/Clientes/"+this.dados.IDALUNO+".png";
        this.nome = this.dados.NOME;
        this.email= this.dados.EMAIL;
        this.sexo= this.dados.SEXO;
        this.celular= this.dados.CEL;
        this.estadoCivil= this.dados.ESTCIVIL
        this.dtNasc= this.dados.DTNASC;
      }, (err) => {
        this.baseService.showMessage(err.error.text);
      });

    }

  }

}
