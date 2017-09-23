import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickdatePage } from './pickdate';

@NgModule({
  declarations: [
    PickdatePage,
  ],
  imports: [
    IonicPageModule.forChild(PickdatePage),
  ],
})
export class PickdatePageModule {}
