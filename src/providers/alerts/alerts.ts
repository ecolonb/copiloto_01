
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
/*
  Generated class for the AlertsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertsProvider {
  public loading: any;

  constructor(public alertCtrl: AlertController,private loadingCtrl: LoadingController) {
    console.log('Alerts Provider Loaded..');
  }

  openLoadingAlert( strMensaje: string ){
    
  }
  closeLoadingAlert(){
    console.log('Cerrando app');
    this.loading.dismiss;
  }
}
