import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage'
import { Platform, AlertController } from 'ionic-angular';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  //Declaracion de variables globales
  private activo: boolean = false;
  private ObjResultado: any;
  private URL_='http://localhost/rest/index.php/login';
  public objPermisos: UsuarioInterface;

  public razonSocial: string;
  public nombreUsuario: string;
  public urlImagen: string;
  public idUsuario: number;
  public idCliente: number;

  constructor(private httpW: HttpClient,private storageData: Storage,private platformD: Platform,public alertCtrl: AlertController,private loadingCtrl: LoadingController) {
    console.log('Hello LoginProvider Provider');
  }
  validarSesion(emailToSend: string, passToSend: string){
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });
    loading.present();
    emailToSend= emailToSend.toLowerCase();
    console.log(emailToSend,passToSend);
    console.log(this.URL_);

    //Preparando los datos a enviar y las cabeceras
    let DataSend = (
      "email=" + emailToSend +
      "&pass=" + passToSend
    );
    console.log('DataSend',DataSend);
    let HEADERS = {
      headers:{'Content-Type':'application/x-www-form-urlencoded'}
    };
    //Haciendo peticion POST
    this.httpW.post(this.URL_,DataSend,HEADERS).subscribe(
      (ObjSesion)=>{
        console.log('Entro a promise POST',ObjSesion);
        this.ObjResultado = ObjSesion;
        if (this.ObjResultado.error==false){
          this.activo=true;
          this.razonSocial = this.ObjResultado.razonSocial;
          this.nombreUsuario=this.ObjResultado.nombreUsuario;
          this.urlImagen=this.ObjResultado.urlImagen;
          this.idUsuario=this.ObjResultado.idUsuario;
          this.idCliente=this.ObjResultado.idCliente;
          this.objPermisos=this.ObjResultado.permisos;
          console.log('Datos correctos, usar Interfaz para recibir los datos->',this.razonSocial);
          console.log('ID USUARIO',this.idUsuario);
          console.log('nombreUsuario',this.nombreUsuario);
          console.log('Impresion del this.objPermisos',this.objPermisos);
          this.guardarStorage();
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'OK',
            subTitle: 'Has iniciado con una cuenta de administrador, ¿Entiendes el riesgo?',
            buttons: ['OK']
          });
          alert.present();
        }else{
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Usuario o Contraseña incorrectos',
            buttons: ['OK']
          });
          alert.present();
          console.log('Error de credenciales!---->>');
        }
      }
    );
    //console.log(this.ObjResultado);
  }
  /**
   * Declarar una promesa
   * let promesa = new Promise((resolve, reject)=>{});
  */
  guardarStorage(){
    let promesa = new Promise((resolve, reject)=>{
      if (this.platformD.is("cordova")) {
        this.storageData.set('name','Edd Colbar');
      }else{
        if (this.activo) {
          console.log('Entro al IF');
          localStorage.setItem('name','Edd Colbar');
        }else{
          console.log('Entro al ELSE');
          localStorage.removeItem('name');
        }

      }
    });
    return promesa;
  }
}
