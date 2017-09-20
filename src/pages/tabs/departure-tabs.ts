
import { DepartureHomePage } from '../home/departure-home';

import { Component,ViewChild } from '@angular/core';
import { Tabs,IonicPage, Platform, NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'departure-tabs.html',
  selector: 'page-departure-tabs'
})
export class DepartureTabsPage {
  @ViewChild("myTabs") mTabs : Tabs;
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab1Params: any;

  constructor(private navParams: NavParams) {
    this.tab1Params = this.navParams.get('dataDeparture');
    this.tab1Root = 'DepartureHomePage';
    this.tab2Root = 'DepartureCalendarPage';
    this.tab3Root = 'DepartureChangeDatePage';
    this.tab4Root = 'DepartureMorePage';
  }
  mTabBarElement: HTMLElement;
  ionViewDidEnter() {
    if (this.mTabBarElement) return;
    let tabbars = document.getElementsByClassName("tabbar");
    if (tabbars.length > 0) {
      this.createTabBorder(tabbars.item(0));
      this.setSelectedTab(0);
    }
  }


  mData = {
    tabs: 4,
    screen_width: 320
  };
  setSelectedTab(index: number) {
    console.log("Tabs selected index : "+ index);
    
    if(!this.mTabBarElement) return;
    let cx = (index + 0.5) * (this.mData.screen_width / this.mData.tabs);
    let transformX = cx - this.mTabBarElement.clientWidth;

    this.mTabBarElement.style.transform = "translate(" + transformX + "px,-4px)";
  }
  createTabBorder(tabbar) {
    this.mTabBarElement = document.createElement("div");
    this.mTabBarElement.classList.add("divBar");
    tabbar.appendChild(this.mTabBarElement);
    this.mData.screen_width = screen.width;
  }
  mCurrentIndex : number = 0;
  onTabChanged(tab){
    this.mCurrentIndex = this.mTabs.getIndex(this.mTabs.getSelected());
    this.setSelectedTab(this.mCurrentIndex);
  }
}