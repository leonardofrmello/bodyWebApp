import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { CadEvolucaoModalPage } from '../cad-evolucao-modal/cad-evolucao-modal';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { BaseServerProvider } from '../../providers/base-server/base-server';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-evolucao',
  templateUrl: 'evolucao.html',
})
export class EvolucaoPage {

  public menuFooter = "composicao";
  public periodo = "3";
  public evolucao;
  public Nothing =  false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private AmCharts: AmChartsService,
    public baseService: BaseServerProvider,

    ) {
      moment.locale('pt-br'); //seta o tipo portugues de data.
      this.listaGraficos();
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Período',
      buttons: [
        {
          text: '3 Meses',
          handler: () => {
            this.periodo = "3";
            this.atualizaGraf(JSON.parse(localStorage.getItem("listEvolucoes")) ,"3");
          }
        },
        {
          text: '6 Meses',
          handler: () => {
            this.periodo = "6";
            this.atualizaGraf(JSON.parse(localStorage.getItem("listEvolucoes")) ,"6");
          }
        },{
          text: '12 Meses',
          handler: () => {
            this.periodo = "12";
            this.atualizaGraf(JSON.parse(localStorage.getItem("listEvolucoes")) ,"12");
          }
        },
      ]
    });

    actionSheet.present();
  }

  openModal(){
   let contactModal = this.modalCtrl.create(CadEvolucaoModalPage);
   contactModal.present();
  }

  listaGraficos(){

    if(localStorage.getItem("evolucoes") != undefined && localStorage.getItem("evolucoes") != ""){
      let result = JSON.parse(localStorage.getItem("listEvolucoes"));
      this.atualizaGraf(result, "3");
    }else{
      this.baseService.postData("Avaliacoes/AvaliacaoAjax.php?callback=JSON_CALLBACK&BuscarListaEvolucao", true).then((result) => {
        localStorage.setItem("listEvolucoes", JSON.stringify(result));
        this.atualizaGraf(result, "3");
      })
    }

  }

  atualizaGraf(dados, period){

    var dataImc = [];
    var dataIcq = [];
    var dataComp = [];

    var periodo = period;

    let dadosOrdenados:any = dados;

    dadosOrdenados.sort(function(a,b){

      let novaDtA:any = new Date(moment(a.DATA_EVOL).format("YYYY/MM/DD"));
      novaDtA = novaDtA.getTime();

      let novaDtb:any = new Date(moment(b.DATA_EVOL).format("YYYY/MM/DD"));
      novaDtb = novaDtb.getTime();

      return novaDtb - novaDtA;

    });


    var dtHoje:any = new Date(moment(dadosOrdenados.DATA_EVOL).format("YYYY/MM/DD"));
    dtHoje.setMonth(dtHoje.getMonth() - periodo);
    dtHoje = moment(dtHoje).format("YYYY/MM/DD");

    let filtro = dadosOrdenados.filter(function(dados){
        let novaDt:any = new Date(moment(dados.DATA_EVOL).format("YYYY/MM/DD"));
        novaDt = moment(novaDt).format("YYYY/MM/DD");

        return moment(dtHoje).isBefore(novaDt);
    });


    for (var i = filtro.length - 1; i >= 0 ; i--) {
        var imc:any;
        let mgorda:any;
        let mmagra: any;
        let icq: any;


        if (filtro[i].PESO_EVOL > 0 && filtro[i].ALTURA_EVOL < 3) {
          imc = filtro[i].PESO_EVOL / (filtro[i].ALTURA_EVOL * filtro[i].ALTURA_EVOL);
          imc = imc.toFixed(2);
        }

        if (filtro[i].CINTURA_EVOL > 0 && filtro[i].QUADRIL_EVOL > 0) {
            icq = filtro[i].CINTURA_EVOL / filtro[i].QUADRIL_EVOL;
            icq = icq.toFixed(2);
        }

        if (filtro[i].GORD_ATUAL_EVOL > 0) {
            mgorda = filtro[i].GORD_ATUAL_EVOL * filtro[i].PESO_EVOL / 100;
            mgorda = mgorda.toFixed(2);
            mmagra = filtro[i].PESO_EVOL - mgorda;
            mmagra = mmagra.toFixed(2);
        }

        var date = moment(filtro[i].DATA_EVOL).format("DD/MM");
        dataImc.push({ "date": date, "value": imc });
        dataIcq.push({ "date": date, "value": icq });
        dataComp.push({ "date": date, "gorda": mgorda, "magra": mmagra, "peso": filtro[i][0]});
    }


    this.evolucao = filtro.reverse();
    this.Nothing = (this.evolucao.length == 0 ? true : false);
    this.AmCharts.makeChart("graficComposicao", {
      "type": "serial",
      "theme": "light",
      "valueAxes": [{ "stackType": "regular", "id": "v1", "gridPosition": "start", "axisAlpha": 0, "tickLength": 0 }],
      "dataProvider" : dataComp,
      "startDuration": 1,
      "graphs": [
        { "fillAlphas": 0.9, "labelText": "[[percents]] %", "lineAlpha": 0.5, "title": "Gordura", "type": "column", "lineColor": "#FF7F50", "valueField": "gorda", "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>" },
        { "fillAlphas": 0.9, "labelText": "[[percents]] %", "lineAlpha": 0.5, "title": "Magra", "type": "column", "lineColor": "#44b6ae", "valueField": "magra", "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>" },
        { "id": "g1","valueAxis": "v1","bullet": "round","bulletBorderAlpha": 1,"bulletColor": "#FFFFFF","bulletSize": 5,"hideBulletsCount": 50,"lineThickness": 2,"lineColor": "#20acd4","type": "smoothedLine","title": "Peso","useLineColorForBulletBorder": true,"valueField": "peso","balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"}
      ],
      "categoryField": "date"

    })

    this.AmCharts.makeChart("graficoIMC", {
      "type": "serial",
      "theme": "light",
      "autoMargins": true,
      "startDuration": 1,
      "valueAxes": [{ "gridPosition": "start", "axisAlpha": 0, "tickLength": 0 }],
      "dataProvider" : dataImc,
      "graphs": [
        { "lineColor": "#67b7dc", "bulletSize": 5, "bullet": "round", "valueField": "value", "balloonText": "<div style='margin:10px; text-align:left;'><span style='font-size:12px'>[[category]]</span> <span style='font-size:12px'> - [[value]]</span>" }
      ],
      "categoryField": "date"
    })

    this.AmCharts.makeChart("graficoICQ", {
      "type": "serial",
      "theme": "light",
      "autoMargins": true,
      "startDuration": 1, "valueAxes": [{ "gridPosition": "start", "axisAlpha": 0, "tickLength": 0 }],
      "dataProvider" : dataIcq,
      "graphs": [
        { "lineColor": "#67b7dc", "bulletSize": 5, "bullet": "round", "valueField": "value", "balloonText": "<div style='margin:10px; text-align:left;'><span style='font-size:12px'>[[category]]</span> <span style='font-size:12px'> - [[value]]</span>"}
      ],
      "categoryField": "date"
    })



  }


}
