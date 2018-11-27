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
  public typeAval:string = "composicao";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider,
    private AmCharts: AmChartsService
    ) {
  }

  ionViewDidLoad() {
    this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "categoryField": "category",
      "categoryAxis": {
        "gridPosition": "start"
      },
      "graphs": [
        {
          "title": "Graph title",
          "valueField": "column-1"
        }
      ],
      "valueAxes": [
        {
          "title": "Axis title"
        }
      ],
      "legend": {
        "useGraphSettings": true
      },
      "titles": [
        {
          "size": 15,
          "text": "Chart Title"
        }
      ],
      "dataProvider": [
        {
          "category": "category 1",
          "column-1": 8
        },
        {
          "category": "category 2",
          "column-1": 10
        },
      ]
    });
  }


}
