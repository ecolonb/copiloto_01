import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage'
import { Platform, AlertController } from 'ionic-angular';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { LoadingController } from 'ionic-angular';
import { AlertsProvider } from '../alerts/alerts';
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
  private URL_='http://pruebaunne01.cloudapp.net/dev5/api_rest/api/Login';
  public objPermisos: UsuarioInterface;

  public razonSocial: string;
  public nombreUsuario: string;
  public urlImagen: string;
  public idUsuario: number;
  public idCliente: number;

  constructor(private httpW: HttpClient,private storageData: Storage,private platformD: Platform,public alertCtrl: AlertController,private loadingCtrl: LoadingController, private alertsProviderO: AlertsProvider) {
    console.log('Hello LoginProvider Provider');
  }
  validarSesion(userToSend: string, passToSend: string): Observable<any>{
    userToSend= userToSend.toLowerCase();
    console.log(userToSend,passToSend);
    console.log(this.URL_);

    //Preparando los datos a enviar y las cabeceras
    let DataSend = (
      "user=" + userToSend +
      "&password=" + passToSend
    );
    console.log('DataSend',DataSend);
    let HEADERS = {
      headers:{'Content-Type':'application/json; charset=utf-8'}
    };

    let dataSendform = {
      "user": userToSend,
      "password": btoa(passToSend)
    }
    console.log('dataSendform',dataSendform);
    return this.httpW.post<Observable<any>>(this.URL_, dataSendform, HEADERS).map((RESULT)=>{
      console.log('RESULT provider', RESULT);

      return RESULT;
    });;
  }

//   access-control-allow-credentials →true
// access-control-allow-headers →content-Type, accept, origin, X-Requested-With, Authorization, name
// access-control-allow-methods →POST, PUT, DELETE, GET, OPTIONS
// access-control-allow-origin →*
// cache-control →no-cache
// content-length →124
// content-type →application/json; charset=utf-8
  
  cerrarSesion(){
    localStorage.clear();

  }
    //Haciendo peticion POST
  // this.httpW.post(this.URL_,DataSend,HEADERS).subscribe(
  //     (ObjSesion)=>{
  //       console.log('Entro a promise POST',ObjSesion);
  //       this.ObjResultado = ObjSesion;
  //       if (this.ObjResultado.error==false){
  //         this.activo=true;
  //         this.razonSocial = this.ObjResultado.razonSocial;
  //         this.nombreUsuario=this.ObjResultado.nombreUsuario;
  //         this.urlImagen=this.ObjResultado.urlImagen;
  //         this.idUsuario=this.ObjResultado.idUsuario;
  //         this.idCliente=this.ObjResultado.idCliente;
  //         this.objPermisos=this.ObjResultado.permisos;
  //         console.log('Datos correctos, usar Interfaz para recibir los datos->',this.razonSocial);
  //         console.log('ID USUARIO',this.idUsuario);
  //         console.log('nombreUsuario',this.nombreUsuario);
  //         console.log('Impresion del this.objPermisos',this.objPermisos);
  //         this.guardarStorage();
  //         let objRespuesta = {
  //           error: false,
  //           type: 0,
  //           message: 'Has iniciado con una cuenta de administrador, ¿Entiendes el riesgo? saldras de la plataforma'
  //         };
  //         console.log('OK');
  //         return Observable.create((observer_: Observable<any>)=> {
  //           objRespuesta;
  //         });
  //       }else{
  //         let objRespuesta = {
  //           error: false,
  //           type: 1,
  //           message: 'Usuario o Contraseña incorrectos'
  //         };
  //         console.log('Error de credenciales!---->>12');
  //         return Observable.create((observer_: Observable<any>)=> {
  //           objRespuesta;
  //         });
  //       }
  //     },(error)=>{
  //       let objRespuesta = {
  //         error: false,
  //         type: 2,
  //         message: error.message
  //       };
  //       console.log('Error en el servicio!---->>');
  //       return Observable.create((observer_: Observable<any>)=> {
  //         objRespuesta;
  //       });
  //     }
  //   );


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
      console.log('Guardar storage');
    });
    return promesa;
  }
  guardarServicio(ObjSesion:any){
    console.log('Guardar sesion',ObjSesion);
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
  }
}
}
