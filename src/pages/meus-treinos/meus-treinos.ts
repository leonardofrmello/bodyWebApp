import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MeusTreinosDetalhePage } from '../meus-treinos-detalhe/meus-treinos-detalhe';
import { BaseServerProvider } from '../../providers/base-server/base-server';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-meus-treinos',
  templateUrl: 'meus-treinos.html',
})
export class MeusTreinosPage {

  public typeTreino:string = "hoje";
  public treinosAtivos = [];
  public treinosTodos = [];
  public treinoHoje= [];
  public treinosVencidos = [];

  public NothignToday = false;
  public NothignAtivo = false;
  public NothignTodos = false;
  public NothignVencidos = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
    ) {

      moment.locale('pt-br'); //seta o tipo portugues de data.
      this.carregaTreinos();
  }

  carregaTreinos(){

    if(localStorage.getItem("listaTreinos") != undefined && localStorage.getItem("listaTreinos") != ""){

      this.organizaTreino(JSON.parse(localStorage.getItem("listaTreinos")));

    }else{

      this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarTreinos=T").then((result) => {
        this.organizaTreino(result);
      })

    }

  }

  ordenaTreino(data){
    this.treinosTodos = data.data;
  }

  organizaTreino(dados){

    let data = dados.data;
    let dataHoje = moment().format("YYYY/MM/DD");
    let dia = new Date();
    let diaSemana = dia.getDay();

    for(var x=0; x<data.length; x++){
      let dtInicial = data[x][2].split("/");
      dtInicial = dtInicial[2]+"/"+dtInicial[1]+"/"+dtInicial[0];

      let dtFinal = data[x][3].split("/");
      dtFinal = dtFinal[2]+"/"+dtFinal[1]+"/"+dtFinal[0];


      //treinos vencidos - OK-- ( Data fim < data de hoje)
      if(moment(dtFinal).isBefore(dataHoje)){
        this.treinosVencidos.push(data[x]);
      }

      //treino ativo -- ok ( Data final > data de hoje )
      if( dtFinal > dataHoje ){
        this.treinosAtivos.push(data[x]);

        if(data[x][8][diaSemana] == "S"){
          this.treinoHoje.push(data[x]);
        }

      }
    }
    this.treinosTodos = data;

    this.NothignToday = (this.treinoHoje.length == 0 ? false : true);
    this.NothignAtivo = (this.treinosAtivos.length == 0 ? false : true);
    this.NothignVencidos = (this.treinosVencidos.length == 0 ? false : true);
    this.NothignTodos = (this.treinosTodos.length == 0 ? false : true);

  }

  openPage(dados){
    console.log("troca page");
    this.navCtrl.push(MeusTreinosDetalhePage, dados);
  }

}
