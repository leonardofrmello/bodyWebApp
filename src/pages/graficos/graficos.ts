import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@IonicPage()
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
})
export class GraficosPage {

  private chart: AmChart;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private AmCharts: AmChartsService
    ) {
  }

  ngAfterViewInit() {
    this.AmCharts.makeChart("grafico", {
      "type": "serial",
      "theme": "light",
      "dataProvider" : [
        {"resultado": "", "Minimo": 18.5, "Meta": 24, "Maximo": 24.9}
      ],
      "startDuration": 1,
      "graphs": [
          {
            "fillAlphas": 0.9,
            "title": "Minimo", "type": "column", "valueField": "Minimo",
            "labelText": "Minimo", "lineColor": "#B0C4DE","balloonText": "<span style='font-size:13px;'>Indice Mínimo :<b>[[value]]</span>"

          },
          {
            "fillAlphas": 0.9, "alphaField": "alpha", "labelText": "Obtido", "lineAlpha": 0.1, "title": "Meta", "type": "column", "valueField": "Meta", "lineColor": (50 > 24.9 || 10 < 18.5) ? "#FF6347" : "#66CDAA", "dashLengthField": "dashLengthColumn", "balloonText": "<span style='font-size:13px;'>Indice Obtido: <b>[[value]] </b> </span>\n\<span style='font-size:13px;'>Classificação: <b>" + "obesooo" +"</b> </span>\n\<span style='font-size:13px;'>Riscos a Saúde: <b>" + "ALTOO" +"</b> </span>"},
          {
            "fillAlphas": 0.9, "labelText": "Máximo", "lineAlpha": 0.2, "title": "Máximo", "type": "column", "valueField": "Maximo", "lineColor": "#B0C4DE", "balloonText": "<span style='font-size:13px;'>Indice Máximo :<b>[[value]]</span>",
          }
        ]

    })
    /*

      data: [{"resultado": "", "Minimo": 18.5, "Meta": $scope.imc, "Maximo": 24.9}],
       "autoMargins": true, "startDuration": 1,
       "valueAxes": [{"gridPosition": "start", "axisAlpha": 0, "tickLength": 0}],
      "graphs": [{"fillAlphas": 0.9, "labelText": "[[value]]", "lineAlpha": 0.1, "title": "Minimo", "type": "column", "valueField": "Minimo", "labelText": "Minimo", "lineColor": "#B0C4DE","balloonText": "<span style='font-size:13px;'>Indice Mínimo :<b>[[value]]</span>"},
                 {"fillAlphas": 0.9, "alphaField": "alpha", "labelText": "Obtido", "lineAlpha": 0.1, "title": "Meta", "type": "column", "valueField": "Meta", "lineColor": ($scope.imc > 24.9 || $scope.imc < 18.5) ? "#FF6347" : "#66CDAA", "dashLengthField": "dashLengthColumn", "balloonText": "<span style='font-size:13px;'>Indice Obtido: <b>[[value]] </b> </span>\n\<span style='font-size:13px;'>Classificação: <b>" + $scope.classIMC($scope.imc,"P",0) +"</b> </span>\n\<span style='font-size:13px;'>Riscos a Saúde: <b>" + $scope.classIMC($scope.imc,"S",0) +"</b> </span>"},
                 {"fillAlphas": 0.9, "labelText": "Máximo", "lineAlpha": 0.2, "title": "Máximo", "type": "column", "valueField": "Maximo", "lineColor": "#B0C4DE", "balloonText": "<span style='font-size:13px;'>Indice Máximo :<b>[[value]]</span>","lineColor": "#B0C4DE"}],
      "categoryField": "resultado"
    */

  }

  //Um exemplo que funciona
  /*ngAfterViewInit() {
     this.AmCharts.makeChart("grafico", {
      "type": "serial",
      "theme": "light",
      "marginBottom": 50,
      "dataProvider": [{
          "age": "Average Opened",
          "male": -0.8,
          "female": 0.3,
          "bullet":"<text>&#9650;</text>",
      }, {
          "age": "Average Effort",
          "male": -0.2,
          "female": 0.3,

      }, {
          "age": "Average Speed",
          "male": -0.3,
          "female": 0.6
      }, {
          "age": "Average Handle",
          "male": -0.5,
          "female": 0.8
      }],
      "startDuration": 1,
      "graphs": [{
          "fillAlphas": 0.8,
          "lineAlpha": 0.2,
          "type": "column",
          "valueField": "male",
          "title": "Monthly",
          "customBulletField": "bullet",
          "labelText": "[[value]]",
          "clustered": false,
          "labelFunction": function (item) {
              return Math.abs(item.values.value);
          },
          "balloonFunction": function (item) {
              return item.category + ": " + Math.abs(item.values.value) + "%";
          }
      }, {
          "fillAlphas": 0.8,
          "lineAlpha": 0.2,
          "type": "column",
          "valueField": "female",
          "title": "Weekly",
          "labelText": "[[value]]",
          "clustered": false,
          "labelFunction": function (item) {
              return Math.abs(item.values.value);
          },
          "balloonFunction": function (item) {
              return item.category + ": " + Math.abs(item.values.value) + "%";
          }
      }],
      "categoryField": "age",
      "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0.2,
          "axisAlpha": 0
      },
      "valueAxes": [{
          "gridAlpha": 0,
          "ignoreAxisWidth": true,
          "labelsEnabled": false,
          "labelFunction": function (value) {
              return Math.abs(value) + '%';
          },
          "guides": [{
              "value": 0,
              "lineAlpha": 0.2
          }]
      }],
      "balloon": {
          "fixedPosition": true
      },
      "allLabels": [{
          "text": "Weekly",
          "x": "28%",
          "y": "85%",
          "bold": true,
          "align": "middle"
      }, {
          "text": "Monthly",
          "x": "75%",
          "y": "85%",
          "bold": true,
          "align": "middle"
      }],

    });
  }*/

  /*ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }*/

}
