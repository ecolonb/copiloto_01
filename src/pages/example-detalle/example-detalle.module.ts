import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExampleDetallePage } from './example-detalle';

@NgModule({
  declarations: [
    ExampleDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(ExampleDetallePage),
  ],
})
export class ExampleDetallePageModule {}
