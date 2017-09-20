import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';


@IonicPage()
@Component({
  selector: 'page-departure-more',
  templateUrl: 'departure-more.html',
})
export class DepartureMorePage {
  more_options = [];
  isPlatform;
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private mDepartureModule: DepartureModule,
    private platform : Platform
  ) {
    this.isPlatform = this.platform._platforms[2];
    console.log(this.isPlatform);
    this.more_options = this.mDepartureModule.getOptions();
  }

}
