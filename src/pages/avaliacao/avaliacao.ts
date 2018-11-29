import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseServerProvider } from '../../providers/base-server/base-server';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvaliacaoPage {

  public chart: AmChart;
  public chart2: AmChart;
  public typeAval:string = "composicao";
  public dadosAval;
  public dadosAluno;

  public classificIMC;
  public classificacaoIcq;
  public risco;
  public imc;
  public icq;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
    private AmCharts: AmChartsService
    ) {
      console.log(this.navParams.data[0]);
      this.dadosAluno = JSON.parse(localStorage.getItem("JsonPerfil"));
      this.carregaAvaliacao(this.navParams.data[0]);
  }

  ionViewDidLoad() {

  }

  montaGraficoIMC(imc, classific, risco){
    this.AmCharts.makeChart("graficoIMC", {
      "type": "serial",
      "theme": "light",
      "dataProvider" : [
        {"resultado": "", "Minimo": 18.5, "Meta": imc, "Maximo": 24.9}
      ],
      "startDuration": 1,
      "graphs": [
          {
            "fillAlphas": 0.9,
            "title": "Minimo", "type": "column", "valueField": "Minimo",
            "labelText": "Minimo", "lineColor": "#B0C4DE","balloonText": "<span style='font-size:13px;'>Indice Mínimo :<b>[[value]]</span>"

          },
          {
            "fillAlphas": 0.9, "alphaField": "alpha", "labelText": "Obtido", "lineAlpha": 0.1, "title": "Meta", "type": "column", "valueField": "Meta", "lineColor": (imc > 24.9 || imc < 18.5) ? "#FF6347" : "#66CDAA", "dashLengthField": "dashLengthColumn", "balloonText": "<span style='font-size:13px;'>Indice Obtido: <b>[[value]] </b> </span>\n\<span style='font-size:13px;'>Classificação: <b>" + classific +"</b> </span>\n\<span style='font-size:13px;'>Riscos a Saúde: <b>" + risco +"</b> </span>"},
          {
            "fillAlphas": 0.9, "labelText": "Máximo", "lineAlpha": 0.2, "title": "Máximo", "type": "column", "valueField": "Maximo", "lineColor": "#B0C4DE", "balloonText": "<span style='font-size:13px;'>Indice Máximo :<b>[[value]]</span>",
          }
        ]

    })
  }

  montaGraficoICQ(icq, sexo, idade){


     /* $scope.anamnese.push({
        0 : results.rows.item(0).PESO,
        1 : results.rows.item(0).ALTURA,
        2 : results.rows.item(0).CINTURA,
        3 : results.rows.item(0).QUADRIL,
        4 : results.rows.item(0).IDADE,
        5 : results.rows.item(0).SEXO === 'MASCULINO' ? "1" : "0",
        6 : results.rows.item(0).GORD_ATUAL_EVOL,
        7 : results.rows.item(0).NOME,
        8 : results.rows.item(0).STATUS,
        9 : results.rows.item(0).DATA_EVOL
    });*/

      //this.dadosAval

    this.AmCharts.makeChart("graficoICQ", {
      "type": "serial",
      "theme": "light",
      "dataProvider" : [
        {
          "resultado": "",
          "Minimo": this.valRisco("B",sexo,idade),
          "Meta": icq,
          "Maximo": this.valRisco("A",sexo,idade)
        }
      ],
      "startDuration": 1,
      "graphs": [
        {"fillAlphas": 0.9, "labelText": "[[value]]", "lineAlpha": 0.1, "title": "Minimo", "type": "column", "valueField": "Minimo", "labelText": "Baixo", "lineColor": "#B0C4DE","balloonText": "<span style='font-size:13px;'>Indice Baixo Risco :<b>[[value]]</span>"},

        {
          "fillAlphas": 0.9,
          "alphaField": "alpha",
          "labelText": "Obtido", "lineAlpha": 0.1, "title": "Meta",
          "type": "column", "valueField": "Meta",
          "lineColor": (icq > this.valRisco("A",sexo,idade)) ? "#FF6347" : "#66CDAA",
          "dashLengthField": "dashLengthColumn", "balloonText": "<span style='font-size:13px;'>Indice Obtido: <b>[[value]] </b> </span>\n\<span style='font-size:13px;'>Classificação: <b>" + this.classICQ(icq,sexo,idade) +"</b> </span>"},

        {"fillAlphas": 0.9, "labelText": "Alto", "lineAlpha": 0.2, "title": "Máximo", "type": "column", "valueField": "Maximo", "lineColor": "#B0C4DE", "balloonText": "<span style='font-size:13px;'>Indice Alto Risco :<b>[[value]]</span>","lineColor": "#B0C4DE"}
      ],

    })

    /*$scope.grICQOptions = {
      data: [
        {"resultado": "", "Minimo": $scope.valRisco("B",$scope.anamnese[0][5],$scope.anamnese[0][4]), "Meta": $scope.icq, "Maximo": $scope.valRisco("A",$scope.anamnese[0][5],$scope.anamnese[0][4])}
      ],
      "type": "serial", "theme": "light",  "autoMargins": true, "startDuration": 1,
      "valueAxes": [{"gridPosition": "start", "axisAlpha": 0, "tickLength": 0}],

      "graphs": [
        {"fillAlphas": 0.9, "labelText": "[[value]]", "lineAlpha": 0.1, "title": "Minimo", "type": "column", "valueField": "Minimo", "labelText": "Baixo", "lineColor": "#B0C4DE","balloonText": "<span style='font-size:13px;'>Indice Baixo Risco :<b>[[value]]</span>"},
        {"fillAlphas": 0.9, "alphaField": "alpha", "labelText": "Obtido", "lineAlpha": 0.1, "title": "Meta", "type": "column", "valueField": "Meta", "lineColor": ($scope.icq > $scope.valRisco("A",$scope.anamnese[0][5],$scope.anamnese[0][4])) ? "#FF6347" : "#66CDAA", "dashLengthField": "dashLengthColumn", "balloonText": "<span style='font-size:13px;'>Indice Obtido: <b>[[value]] </b> </span>\n\<span style='font-size:13px;'>Classificação: <b>" + $scope.classICQ($scope.icq,0,29) +"</b> </span>"},
        {"fillAlphas": 0.9, "labelText": "Alto", "lineAlpha": 0.2, "title": "Máximo", "type": "column", "valueField": "Maximo", "lineColor": "#B0C4DE", "balloonText": "<span style='font-size:13px;'>Indice Alto Risco :<b>[[value]]</span>","lineColor": "#B0C4DE"}
      ],

        "categoryField": "resultado"
    }; */

  }


  carregaAvaliacao(idAval){

    this.baseService.postData("Avaliacoes/AvaliacaoAjax.php?callback=JSON_CALLBACK&BuscarListaEvolucao", false).then((result) => {

      let sexo = (this.dadosAluno.SEXO == "MASCULINO" ? 1 : 0);
      let idd = this.dadosAluno.DTNASC.split("/");
      let idade =  this.idade(idd[2], idd[1], idd[0]);

      let filtro = result.filter(function(dados){
          return dados.ID_EVOL == idAval;
        });

      //valor retornado da avaliacao
      this.dadosAval = filtro[0];

      if (this.dadosAval.ALTURA_EVOL > 0 && this.dadosAval.ALTURA_EVOL < 3) {
          this.imc = this.dadosAval.PESO_EVOL / (this.dadosAval.ALTURA_EVOL * this.dadosAval.ALTURA_EVOL);
          this.imc = this.imc.toFixed(2);
      }

      if (this.dadosAval.QUADRIL_EVOL > 0) {
          this.icq = this.dadosAval.CINTURA_EVOL / this.dadosAval.QUADRIL_EVOL;
          this.icq = this.icq.toFixed(2);
      }


      this.classificIMC = this.classIMC(this.imc, "P", sexo);
      this.risco =  this.classIMC(this.imc,"S", sexo);

      //$scope.valRisco("A",$scope.anamnese[0][5],$scope.anamnese[0][4])

      this.classificacaoIcq = this.classICQ(this.icq, 0, 29);

      this.montaGraficoIMC(this.imc, this.classificIMC, this.risco);
      this.montaGraficoICQ(this.icq, sexo, idade);

     })

  }


  classICQ(risco, sexo, idade) {
    if ((sexo === 1 && (idade >= 18 && idade <= 29) && risco < 0.83) ||
        (sexo === 1 && (idade >= 30 && idade <= 39) && risco < 0.84) ||
        (sexo === 1 && (idade >= 40 && idade <= 49) && risco < 0.88) ||
        (sexo === 1 && (idade >= 50 && idade <= 59) && risco < 0.90) ||
        (sexo === 1 && (idade >= 60 && idade <= 69) && risco < 0.91) ||
        (sexo === 0 && (idade >= 18 && idade <= 29) && risco < 0.71) ||
        (sexo === 0 && (idade >= 30 && idade <= 39) && risco < 0.72) ||
        (sexo === 0 && (idade >= 40 && idade <= 49) && risco < 0.73) ||
        (sexo === 0 && (idade >= 50 && idade <= 59) && risco < 0.74) ||
        (sexo === 0 && (idade >= 60 && idade <= 69) && risco < 0.76)){
            return "BAIXO";
        }else if ((sexo === 1 && (idade >= 18 && idade <= 29) && (risco >= 0.83 && risco < 0.88)) ||
        (sexo === 1 && (idade >= 30 && idade <= 39) && (risco >= 0.84 && risco < 0.91)) ||
        (sexo === 1 && (idade >= 40 && idade <= 49) && (risco >= 0.88 && risco < 0.95)) ||
        (sexo === 1 && (idade >= 50 && idade <= 59) && (risco >= 0.90 && risco < 0.96)) ||
        (sexo === 1 && (idade >= 60 && idade <= 69) && (risco >= 0.91 && risco < 0.98)) ||
        (sexo === 0 && (idade >= 18 && idade <= 29) && (risco >= 0.71 && risco < 0.77)) ||
        (sexo === 0 && (idade >= 30 && idade <= 39) && (risco >= 0.72 && risco < 0.78)) ||
        (sexo === 0 && (idade >= 40 && idade <= 49) && (risco >= 0.73 && risco < 0.79)) ||
        (sexo === 0 && (idade >= 50 && idade <= 59) && (risco >= 0.74 && risco < 0.81)) ||
        (sexo === 0 && (idade >= 60 && idade <= 69) && (risco >= 0.76 && risco < 0.83))){
            return "MODERADO";
        }else if ((sexo === 1 && (idade >= 18 && idade <= 29) && (risco >= 0.89 && risco <= 0.94)) ||
        (sexo === 1 && (idade >= 30 && idade <= 39) && (risco >= 0.91 && risco <= 0.96)) ||
        (sexo === 1 && (idade >= 40 && idade <= 49) && (risco >= 0.96 && risco <= 1.00)) ||
        (sexo === 1 && (idade >= 50 && idade <= 59) && (risco >= 0.97 && risco <= 1.02)) ||
        (sexo === 1 && (idade >= 60 && idade <= 69) && (risco >= 0.99 && risco <= 1.03)) ||
        (sexo === 0 && (idade >= 18 && idade <= 29) && (risco >= 0.76 && risco <= 0.83)) ||
        (sexo === 0 && (idade >= 30 && idade <= 39) && (risco >= 0.79 && risco <= 0.84)) ||
        (sexo === 0 && (idade >= 40 && idade <= 49) && (risco >= 0.80 && risco <= 0.87)) ||
        (sexo === 0 && (idade >= 50 && idade <= 59) && (risco >= 0.82 && risco <= 0.88)) ||
        (sexo === 0 && (idade >= 60 && idade <= 69) && (risco >= 0.84 && risco <= 0.90))){
            return "ALTO";
        }else if ((sexo === 1 && (idade >= 18 && idade <= 29) && (risco > 0.94)) ||
        (sexo === 1 && (idade >= 30 && idade <= 39) && (risco > 0.96)) ||
        (sexo === 1 && (idade >= 40 && idade <= 49) && (risco > 1.00)) ||
        (sexo === 1 && (idade >= 50 && idade <= 59) && (risco > 1.02)) ||
        (sexo === 1 && (idade >= 60 && idade <= 69) && (risco > 1.03)) ||
        (sexo === 0 && (idade >= 18 && idade <= 29) && (risco > 0.83)) ||
        (sexo === 0 && (idade >= 30 && idade <= 39) && (risco > 0.84)) ||
        (sexo === 0 && (idade >= 40 && idade <= 49) && (risco > 0.87)) ||
        (sexo === 0 && (idade >= 50 && idade <= 59) && (risco > 0.88)) ||
        (sexo === 0 && (idade >= 60 && idade <= 69) && (risco > 0.90))){
            return "MUITO ALTO";
        }
    };

  classIMC(valObtido, tipo, sexo) {
    if (tipo === "P"){
        if (valObtido < 18.5 ) {
            return "BAIXO";
        } else if (valObtido >= 18.5 && valObtido <= 24.9){
            return "ACEITÁVEL OU IDEAL";
        } else if (valObtido >= 25 && valObtido <= 29.9){
            return "OBESIDADE LEVE";
        } else if (valObtido >= 30 && valObtido <= 39.9){
            return "OBESIDADE MODERADA";
        } else if (valObtido >= 40){
            return "OBESIDADE SEVERA  ";
        }
    }else{ //Saude
        if ((sexo === 1 && (valObtido >= 17.9 && valObtido <= 18.9))||(sexo === 0 && (valObtido >= 15 && valObtido <= 17.9))) {
            return "RISCO BAIXO";
        }else if ((sexo === 1 && (valObtido >= 19 && valObtido <= 24.9))||(sexo === 0 && (valObtido >= 18 && valObtido <= 24.4))) {
            return "IDEAL";
        }else if ((sexo === 1 && (valObtido >= 25 && valObtido <= 27.7))|| (sexo === 0 && (valObtido >= 24.5 && valObtido <= 27.2))) {
            return "RISCO MODERADO";
        }else if ((sexo === 1 && (valObtido >= 27.8))||(sexo === 0 && (valObtido >= 27.3))) {
            return "RISCO ELEVADO";
        }
    }
  };

  valRisco(risco, sexo, idade) {
    if (sexo === '1') {
        if (risco === "B") {
            if (idade >= 18 && idade <= 29) {
                return 0.83;
            } else if (idade >= 30 && idade <= 39) {
                return 0.84;
            } else if (idade >= 40 && idade <= 49) {
                return 0.88;
            } else if (idade >= 50 && idade <= 59) {
                return 0.90;
            } else if (idade >= 60 && idade <= 69) {
                return 0.91;
            }
        } else {
            if (idade >= 18 && idade <= 29) {
                return 0.94;
            } else if (idade >= 30 && idade <= 39) {
                return 0.96;
            } else if (idade >= 40 && idade <= 49) {
                return 1.00;
            } else if (idade >= 50 && idade <= 59) {
                return 1.02;
            } else if (idade >= 60 && idade <= 69) {
                return 1.03;
            }
        }
    } else {
        if (risco === "B") {
            if (idade >= 18 && idade <= 29) {
                return 0.71;
            } else if (idade >= 30 && idade <= 39) {
                return 0.72;
            } else if (idade >= 40 && idade <= 49) {
                return 0.73;
            } else if (idade >= 50 && idade <= 59) {
                return 0.74;
            } else if (idade >= 60 && idade <= 69) {
                return 0.76;
            }
        } else {
            if (idade >= 18 && idade <= 29) {
                return 0.82;
            } else if (idade >= 30 && idade <= 39) {
                return 0.84;
            } else if (idade >= 40 && idade <= 49) {
                return 0.87;
            } else if (idade >= 50 && idade <= 59) {
                return 0.88;
            } else if (idade >= 60 && idade <= 69) {
                return 0.90;
            }
        }
    }
};

  idade(ano_aniversario, mes_aniversario, dia_aniversario) {
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),

        ano_aniversario = +ano_aniversario,
        mes_aniversario = +mes_aniversario,
        dia_aniversario = +dia_aniversario,

        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
  }


}
