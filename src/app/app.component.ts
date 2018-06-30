import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage,LoginPage } from '../pages/index.paginas';
import { LoginProvider } from '../providers/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, LoginService: LoginProvider) {
  }
  logIn__User(){
    console.log("Entra a logIn");
  }

}

