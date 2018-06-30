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
    // this.LoginService.validarSesion(this.user,this.pass);
    // let loading = this.loadingCtrl.create({
    //   content: "Espere por favor..."
    // });
    // loading.present();
    // setTimeout(()=>{
    //   loading.dismiss();
    //   this.slides.slideNext();
    // },500);


    // Verificar si la clave es valida
    this.LoginService.validarSesion( this.user,this.pass );
        // .then( valido =>{

        //   loading.dismiss();

        //   if( valido ){
        //     // continuar a la siguiente pantalla
        //     this.slides.lockSwipes(false);
        //     this.slides.slideNext();
        //     this.slides.lockSwipes(true);

        //   }else{

        //     this.alertCtrl.create({
        //       title: "Clave no es correcta",
        //       subTitle: "Por favor verifique su clave, o hable con el adminsitrador",
        //       buttons: ["Ok!"]
        //     }).present();

        //   }



        // })
        // .catch( error=>{
        //     loading.dismiss();
        //     console.log("ERROR en verifica_usuario: " + JSON.stringify( error ));
        // })

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
