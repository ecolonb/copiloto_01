import { LoginProvider } from '../../providers/login/login';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number = 51.678418;
  lng: number = 7.809007;
  LoginPage_: any = LoginPage;

  constructor(public navCtrl: NavController, public pvSesion: LoginProvider) {

  }
  cerrarSesion(){
    this.pvSesion.cerrarSesion();
    console.log('Cerrando sesion, se eliminan datos del localStorage');
    this.navCtrl.setRoot( LoginPage );
  }

}
