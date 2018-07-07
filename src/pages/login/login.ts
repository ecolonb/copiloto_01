import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Slides, LoadingController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit{
  @ViewChild(Slides) slides: Slides;
  public pass:string = "";
  public user:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private loadingCtrl: LoadingController,public LoginService:LoginProvider) {
  }
  logInUser(){
    console.log('logInUser() FROM LOGIN PAGE');
    this.showAlert();
    //this.goToPage();
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Usuario o Contraseña incorrectos',
      buttons: ['OK']
    });
    alert.present();
  }
  goToPage() {
      this.navCtrl.push(HomePage);
      //this.navCtrl.popToRoot(); Regresar a la pagina principal
  }
  continuar(){
    let ObjMEnsaje: any;
    let loading = this.loadingCtrl.create({
      content: 'Iniciando la aplicación. Favor de esperar...'
    });
    loading.present();

    this.LoginService.validarSesion(this.user,this.pass).subscribe((DATARCV)=>{
      if(DATARCV){
        console.log('DATARCV-->',DATARCV);
      ObjMEnsaje = DATARCV;
      console.log('Respuesa-->',ObjMEnsaje);
      if (ObjMEnsaje.error == false) {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'OK',
          subTitle: 'HAs inciado como admin',
          buttons: [
            {
              text: 'NO',
              role: 'cancel',
              handler: ()=> {
                console.log('Cancelar');
              }
            },{
              text: 'SI',
              role: 'si',
              handler: ()=> {
                //Guardar en el storage
                this.LoginService.guardarServicio(DATARCV);
                console.log('boton OK');
                this.slides.lockSwipes(false);
                this.slides.slideNext();
                this.slides.lockSwipes(true);
              }
            }
          ]
        });
        alert.present();
      }else{
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: ObjMEnsaje.mensaje,
          buttons: [{
              text: 'Ok',
              role: 'ok',
              handler: ()=> {
                console.log('boton OK');
              }
            }]
        });
        alert.present();
      }
      }else{
        console.log('no hay datos');
      }


    },(error)=>{
      console.log('Error',error);
      loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error.message,
          buttons: [{
              text: 'Ok',
              role: 'ok',
              handler: ()=> {
                console.log('boton OK');
              }
            }]
        });
        alert.present();
    });
  }

  ingresar(){
    // tenemos la clave, ir al home
    this.navCtrl.setRoot( HomePage );
  }

  ngAfterViewInit(){

    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";

  }
}
