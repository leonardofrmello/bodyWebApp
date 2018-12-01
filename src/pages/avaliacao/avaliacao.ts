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
  public Avaliacao;
  public dadosAval;
  public dadosAluno;

  public classificIMC;
  public classificacaoIcq;
  public risco;
  public imc;
  public icq;

  public composicao = [];
  public percGord:any;
  public percGordMeta:any;
  public percGordDif;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
    private AmCharts: AmChartsService
    ) {
      this.Avaliacao = this.navParams.data;
      console.log(this.Avaliacao);
      this.dadosAluno = JSON.parse(localStorage.getItem("JsonPerfil"));

      //Graficos de IMC e IRQ
      this.carregaAvaliacao(this.navParams.data[0]);
      this.carregaAntropometria(this.navParams.data[0]);
  }



  carregaAntropometria(id){
    this.baseService.postData("Avaliacoes/AvaliacaoAjax.php?callback=JSON_CALLBACK&BuscarAvaliacaoAntropometriaTodos=T", false).then((result) => {

      let novosDados = [];
      novosDados.push(result);

      let filtro = novosDados[0].data.filter(function(dados){
        return dados[0] == id;
      });



      this.montaGraficoAntropo(filtro[0]);
    })
  }//// fim carregaAntropometria

  carregaAvaliacao(idAval){

    this.baseService.postData("Avaliacoes/AvaliacaoAjax.php?callback=JSON_CALLBACK&BuscarListaEvolucao", false).then((result) => {

      let sexo = (this.dadosAluno.SEXO == "MASCULINO" ? 1 : 0);
      let idd = this.dadosAluno.DTNASC.split("/");
      let idade =  this.idade(idd[2], idd[1], idd[0]);

      let novosDados = [];
      novosDados.push(result);

      let filtro = novosDados[0].filter(function(dados){
          return dados.ID_EVOL == idAval;
      });

      //valor retornado da avaliacao
      this.dadosAval = filtro[0];
      console.log(this.dadosAval);

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
      this.classificacaoIcq = this.classICQ(this.icq, 0, 29);


      this.montaGraficoIMC(this.imc, this.classificIMC, this.risco);
      this.montaGraficoICQ(this.icq, sexo, idade);
     })

  }//////// fim carrega avaliacao


  montaGraficoAntropo(dados){

    if(dados != undefined){

      if(dados[7] > 0 && dados[8] > 0){

        this.composicao.push(
          {
            year : 'Atual',
            gorda : dados[1],
            ossea : dados[7],
            residual : dados[8],
            muscular : dados[9]
          },
          {
            year : 'Meta',
            gorda : dados[2],
            ossea : dados[7],
            residual : dados[8],
            muscular : dados[10]
          },{
            year : 'Ideal',
            gorda : dados[3],
            ossea : dados[7],
            residual : dados[8],
            muscular : dados[11]
        }
      );

      }else{
        this.composicao.push({
          year : 'Atual',
          gorda : dados[1],
          magra : dados[4]
        },
        {
          year : 'Meta',
          gorda : dados[2],
          magra : dados[5]
        },{
          year : 'Ideal',
          gorda : dados[3],
          magra : dados[6]
        });
      }

    }else{
        this.composicao.push({
          year : 'Atual',
          gorda : 0,
          magra : 0
      },
      {
          year : 'Meta',
          gorda : 0,
          magra : 0
      },{
          year : 'Ideal',
          gorda : 0,
          magra : 0
      });
    }

    if(this.composicao[0].ossea !== undefined){
      console.log("ossear diferente e unfined");
      this.percGord = (parseFloat(this.composicao[0].gorda) * 100 / (parseFloat(this.composicao[0].gorda) + parseFloat(this.composicao[0].muscular) + parseFloat(this.composicao[0].ossea) + parseFloat(this.composicao[0].residual))).toFixed(2);
      this.percGordMeta = (parseFloat(this.composicao[1].gorda) * 100 / (parseFloat(this.composicao[1].gorda) + parseFloat(this.composicao[1].muscular) + parseFloat(this.composicao[1].ossea) + parseFloat(this.composicao[1].residual))).toFixed(2);

      this.AmCharts.makeChart("graficoAvaliacao", {
        "type": "serial",
        "theme": "light",
        "dataProvider" : this.composicao,
        "startDuration": 1,
        "valueAxes": [{ "stackType": "100%", "axisAlpha": 0.3, "gridAlpha": 0.1 }],
        "graphs": [
          {
            "fillAlphas": 0.9,
            "labelText": "[[percents]] %",
            "lineAlpha": 0.5,
            "title": "Gordura",
            "type": "column",
            "category" : "Atual",
            "lineColor": "#FF7F50",
            "valueField": "gorda",
            "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>" },
          { "fillAlphas": 0.9, "labelText": "[[percents]] %", "lineAlpha": 0.5, "title": "Ossea", "type": "column", "lineColor": "#B0C4DE", "valueField": "ossea", "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>" },
          { "fillAlphas": 0.9, "labelText": "[[percents]] %", "lineAlpha": 0.5, "title": "Residual", "type": "column", "lineColor": "#66CDAA", "valueField": "residual", "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>" },
          { "fillAlphas": 0.9, "labelText": "[[percents]] %", "lineAlpha": 0.5, "title": "Muscular", "type": "column", "lineColor": "#44b6ae", "valueField": "muscular", "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>" }

        ],
        "categoryField" : "year"
      })

    }else{
      console.log("ossear eh unfined");
      this.percGord = (parseFloat(this.composicao[0].gorda) * 100 / (parseFloat(this.composicao[0].gorda) + parseFloat(this.composicao[0].magra))).toFixed(2);
      this.percGordMeta = (parseFloat(this.composicao[1].gorda) * 100 / (parseFloat(this.composicao[1].gorda) + parseFloat(this.composicao[1].magra))).toFixed(2);

      this.AmCharts.makeChart("graficoAvaliacao", {
        "type": "serial",
        "theme": "light",
        "dataProvider" : this.composicao,
        "startDuration": 1,
        "valueAxes": [{ "stackType": "100%", "axisAlpha": 0.3, "gridAlpha": 0.1 }],
        "graphs": [
          { "fillAlphas": 0.9, "labelText": "[[percents]] %", "lineAlpha": 0.5, "title": "Gordura", "type": "column", "lineColor": "#FF7F50", "valueField": "gorda", "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>" },
          { "fillAlphas": 0.9, "labelText": "[[percents]] %", "lineAlpha": 0.5, "title": "Magra", "type": "column", "lineColor": "#44b6ae", "valueField": "magra", "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>" }
        ],
        "categoryField" : "year"
      })
    }

    this.percGordDif = Math.abs((this.percGord - this.percGordMeta));
    this.percGordDif = this.percGordDif.toFixed(2);

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
            "labelText": "Minimo",
            "lineColor": "#B0C4DE","balloonText": "<span style='font-size:13px;'>Indice Mínimo :<b>[[value]]</span>"
          },
          {
            "fillAlphas": 0.9, "alphaField": "alpha",
            "labelText": "Obtido",
            "lineAlpha": 0.1, "title": "Meta",
            "type": "column", "valueField": "Meta",
            "lineColor": (imc > 24.9 || imc < 18.5) ? "#FF6347" : "#66CDAA",
            "dashLengthField": "dashLengthColumn", "balloonText": "<span style='font-size:13px;'>Indice Obtido: <b>[[value]] </b> </span>\n\<span style='font-size:13px;'>Classificação: <b>" + classific +"</b> </span>\n\<span style='font-size:13px;'>Riscos a Saúde: <b>" + risco +"</b> </span>"},
          {
            "fillAlphas": 0.9,
            "labelText": "Máximo",
            "lineAlpha": 0.2, "title": "Máximo", "type": "column",
            "valueField": "Maximo", "lineColor": "#B0C4DE", "balloonText": "<span style='font-size:13px;'>Indice Máximo :<b>[[value]]</span>",
          }
        ]

    })

  }

  montaGraficoICQ(icq, sexo, idade){

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
        {
          "fillAlphas": 0.9,
          "lineAlpha": 0.1,
          "title": "Minimo",
          "type": "column",
          "valueField": "Minimo",
          "labelText": "Baixo",
          "lineColor": "#B0C4DE",
          "balloonText": "<span style='font-size:13px;'>Indice Baixo Risco :<b>[[value]]</span>"},

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
        dia_atual = d.getDate();

      ano_aniversario = +ano_aniversario;
      mes_aniversario = +mes_aniversario;
      dia_aniversario = +dia_aniversario;

      let  quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
  }


}
