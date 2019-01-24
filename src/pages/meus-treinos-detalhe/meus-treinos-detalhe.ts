import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExercicioDescPage } from '../exercicio-desc/exercicio-desc';
import { BaseServerProvider } from '../../providers/base-server/base-server';

@IonicPage()
@Component({
  selector: 'page-meus-treinos-detalhe',
  templateUrl: 'meus-treinos-detalhe.html',
})
export class MeusTreinosDetalhePage {

  public listExerc = [];
  public detalhesTreino;
  public idTreino;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseServerProvider
    ) {
      this.detalhesTreino = navParams.data;
      this.carregaTreino(navParams.data[0]);
      this.idTreino = navParams.data[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusTreinosDetalhePage');
  }

  carregaTreino(id){
    this.listExerc = [];
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&BuscarExecucaoExerciciosTreinos=T&TESTE=S&id="+id).then((result) => {
      this.listExerc.push(result);
      this.listExerc = this.listExerc[0];
      console.log(this.listExerc);
    })

  }

  openPage(){
    this.navCtrl.push(ExercicioDescPage, this.listExerc);
  }

  marcaExerc(idTreino, idExerc, idPag, idExeTreino){
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&ExecutarExercTreino=" + idExerc + "&IdTreino=" + idTreino + "&idExeTreino=" +idExeTreino).then((result) => {
      this.carregaTreino(idTreino);
    })
  }

  desmarcaExerc(idTreino,idExec){
    this.baseService.postData("Treinos/TreinoAjax.php?callback=JSON_CALLBACK&DesmarcarExercTreino=" + idExec).then((result) => {
      this.carregaTreino(idTreino);
    })
  }

  /* $scope.desmarcaExerc = function (idTreino, idExerc, idExec, idPag, idExeTreino) {
    var db = window.openDatabase("GoBodyDB", "1.0", "OFFLINE DB", 1000000);
    db.transaction(function(tx){
        if($scope.bdOnLine){
            $http.jsonp("http://www.body.sivis.com.br/Api/Treinos/TreinoAjax.php?callback=JSON_CALLBACK&DesmarcarExercTreino=" + idExec).success(function (response) {});
        }else{
            tx.executeSql("SELECT * FROM TE_TBTREINOEXECUCAO WHERE IDEXETREINO = ? AND DTEXECUCAO = strftime('%Y-%m-%d', 'now')", [idExeTreino], function(tx, results){
                if (results.rows.length === 0) {
                    tx.executeSql("INSERT INTO TE_TBTREINOEXECUCAO (IDEXETREINO, IDTREINOEXECUCAO, IDTREINO, IDEXERCICIO, DTEXECUCAO) VALUES(?,?,?,?,strftime('%Y-%m-%d', 'now'))", [idExeTreino, idExec, idTreino, idExerc]);
                }
            });
        }
        tx.executeSql("DELETE FROM TE_TBTREINOEXECUCAO WHERE IDEXETREINO = ? AND DTEXECUCAO = strftime('%Y-%m-%d', 'now') AND IDTREINOEXECUCAO = 0", [idExeTreino]);
        tx.executeSql("DELETE FROM TL_TBTREINOEXECUCAO WHERE IDEXETREINO = ? AND DTEXECUCAO = strftime('%Y-%m-%d', 'now')", [idExeTreino]);
    });
    if(idPag === 1){
        $scope.carregaExercicio(idTreino,idExeTreino);
    } else {
        $scope.listaExercicios(idTreino);
    }
  }; */
  /*$scope.marcaExerc = function (idTreino, idExerc, idPag, idExeTreino) {
    var db = window.openDatabase("GoBodyDB", "1.0", "OFFLINE DB", 1000000);
    db.transaction(function(tx){
        if($scope.bdOnLine){
            $http.jsonp("http://www.body.sivis.com.br/Api/Treinos/TreinoAjax.php?callback=JSON_CALLBACK&ExecutarExercTreino=" + idExerc + "&IdTreino=" + idTreino + "&idExeTreino=" +idExeTreino).success(function (response) {});
        }else{
            tx.executeSql("SELECT * FROM TE_TBTREINOEXECUCAO WHERE IDEXETREINO = ? AND DTEXECUCAO = strftime('%Y-%m-%d', 'now')", [idExeTreino], function(tx, results){
                if (results.rows.length === 0) {
                    tx.executeSql("INSERT INTO TE_TBTREINOEXECUCAO (IDEXETREINO, IDTREINOEXECUCAO, IDTREINO, IDEXERCICIO, DTEXECUCAO) VALUES(?,?,?,?,strftime('%Y-%m-%d', 'now'))", [idExeTreino, 0, idTreino, idExerc]);
                }
            });
        }
        tx.executeSql("SELECT * FROM TE_TBTREINOEXECUCAO WHERE IDEXETREINO = ? AND DTEXECUCAO = strftime('%Y-%m-%d', 'now')", [idExeTreino], function(tx, results){
            if (results.rows.length === 0) {
                tx.executeSql("INSERT INTO TL_TBTREINOEXECUCAO(IDTREINO, IDEXERCICIO, DTEXECUCAO, IDTREINOEXECUCAO, IDEXETREINO) VALUES (?, ?, strftime('%Y-%m-%d', 'now'), (SELECT COUNT(*) + 1 FROM TL_TBTREINOEXECUCAO), ?)", [idTreino, idExerc, idExeTreino]);
            }else{
                tx.executeSql("INSERT INTO TL_TBTREINOEXECUCAO(IDTREINO, IDEXERCICIO, DTEXECUCAO, IDTREINOEXECUCAO, IDEXETREINO) VALUES (?, ?, strftime('%Y-%m-%d', 'now'), ?, ?)", [idTreino, idExerc, results.rows.item(0).IDTREINOEXECUCAO, idExeTreino]);
            }
        });
        tx.executeSql("DELETE FROM TE_TBTREINOEXECUCAO WHERE IDEXETREINO = ? AND DTEXECUCAO = strftime('%Y-%m-%d', 'now') AND IDTREINOEXECUCAO <> 0", [idExeTreino]);

    });

    if(idPag === 1){
        $scope.carregaExercicio(idTreino,idExeTreino);
    } else {
        $scope.listaExercicios(idTreino);
    }
  };*/

}
