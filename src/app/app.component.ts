import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DepartureTabsPage } from "../pages/tabs/departure-tabs";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = DepartureTabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // statusBar.backgroundColorByHexString('#17cce9');
      splashScreen.hide();
    });
  }
}
