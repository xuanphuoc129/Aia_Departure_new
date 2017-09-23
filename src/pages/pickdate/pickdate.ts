import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Departure } from "../../providers/departure/class/departure";
import { DepartureModule } from "../../providers/departure/departure";

/**
 * Generated class for the PickdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickdate',
  templateUrl: 'pickdate.html',
})
export class PickdatePage {
  datas = [[], [], []];
  day_in_month = [];
  day_30 = [];
  day_29 = [];
  day_28 = [];
  rowHeight = 45;//height of each row in px; Match to css; 
  timeoutObjects = [];
  touchingObjects = [];
  animationFrameObjects = [];
  currentIndex = 6;
  today: any;
  fps = 30;
  submit_button = <HTMLElement>document.getElementById("submit");
  isShowPickDate: boolean = false;
  isScroll: boolean = false;
  selectedDate: Departure;
  solar_date = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private mDepartureModule: DepartureModule,
  ) {
    for (let i = 1; i <= 31; i++) {
      this.datas[0].push(i);
      if (i < 29) {
        this.day_28.push(i);
      }
      if (i < 30) {
        this.day_29.push(i);
      }
      if (i < 31) {
        this.day_30.push(i);
      }
    }
    this.day_in_month = this.datas[0];
    for (let i = 1; i <= 12; i++) {
      this.datas[1].push(i);
    }
    for (let i = 1900; i <= 2200; i++) {
      this.datas[2].push(i);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickdatePage');
  }
  closeSolarDate() {
    this.viewCtrl.dismiss();
  }
  gotoToday() {
    let scrollElms = document.getElementsByClassName('change-date-col');
    this.today = new Date();
    this.selectedDate = new Departure(this.today);
    this.mDepartureModule.updateDepartureInfo([this.selectedDate]);
    if (scrollElms) {
      if (scrollElms) {
        for (let i = 0; i < scrollElms.length; i++) {
          let scrollElm = <HTMLElement>scrollElms[i];
          let index = parseInt(scrollElm.getAttribute('index'));
          if (index == 0) {
            scrollElm.scrollTop = (this.today.getDate() - 1) * this.rowHeight;
          } else if (index == 1) {
            scrollElm.scrollTop = (this.today.getMonth()) * this.rowHeight;
          } else if (index == 2) {
            scrollElm.scrollTop = (this.today.getFullYear() - this.datas[2][0]) * this.rowHeight;
          }
        }
      }
    }
  }
  ionViewDidEnter() {
    this.gotoToday();
    let scrollElms = document.getElementsByClassName('change-date-col');
    if (scrollElms) {
      for (let i = 0; i < scrollElms.length; i++) {
        let scrollElm = <HTMLElement>scrollElms[i];
        let index = parseInt(scrollElm.getAttribute('index'));

        scrollElm.addEventListener('scroll', (event) => {
          if (!this.touchingObjects[index]) {
            this.scrollEnd(scrollElm, index);
          }
        })
        scrollElm.addEventListener('touchstart', () => {

          this.touchingObjects[index] = true;
          this.currentIndex = index;
          this.isScroll = true;


          // this.submit_button.setAttribute("disabled","true");

        })
        scrollElm.addEventListener('touchend', () => {

          this.touchingObjects[index] = false;
          this.scrollEnd(scrollElm, index);
          // this.changeDate(index);


        })
        scrollElm.addEventListener('touchcancel', () => {

          this.touchingObjects[index] = false;
          this.scrollEnd(scrollElm, index);
          // this.changeDate(index);

        })
      }
    }

  }

  scrollToTop(element: HTMLElement, scrollTop, index) {

    let deltaDistance = 5 //in px;
    let nowScrollTop = element.scrollTop;
    if (this.animationFrameObjects[index]) cancelAnimationFrame(this.animationFrameObjects[index]);
    if (Math.abs(nowScrollTop - scrollTop) <= deltaDistance) {
      element.scrollTop = scrollTop;
      // this.getDayInMonth();
      this.changeDate();

      // if(this.currentIndex==1 || this.currentIndex==2){
      //   this.getDayInMonth();
      // }
      this.isScroll = false;
      return;
    }
    if (deltaDistance * this.fps < Math.abs(nowScrollTop - scrollTop)) deltaDistance = Math.round(Math.abs(nowScrollTop - scrollTop) / this.fps);
    let signal = Math.abs(nowScrollTop - scrollTop) / (scrollTop - nowScrollTop);//-1 or 1;
    this.animationFrameObjects[index] = requestAnimationFrame(() => {
      element.scrollTop = nowScrollTop + signal * deltaDistance;
      this.scrollToTop(element, scrollTop, index);
    })
  }

  scrollEnd(scrollElm: HTMLElement, index) {
    //end of touch. May be end of scrolling. Just reset timeout. 
    //Scroll event fire about every 30ms so 100ms timeout is fine
    if (this.currentIndex == index) {

      if (this.timeoutObjects[index]) clearTimeout(this.timeoutObjects[index]);

      if (this.animationFrameObjects[index]) cancelAnimationFrame(this.animationFrameObjects[index]);
      this.timeoutObjects[index] = setTimeout(() => {
        let scrollTop = scrollElm.scrollTop;
        this.scrollToTop(scrollElm, Math.round(scrollTop / this.rowHeight) * this.rowHeight, index);
      }, 100)
    }

  }
  changeDate() {
    let solarElms = document.getElementsByClassName('solar-col');
    this.solar_date = [];

    if (solarElms) {
      for (let i = 0; i < solarElms.length; i++) {
        let solarElm = solarElms[i];
        let index = solarElm.getAttribute('index');
        let childIndex = Math.round(solarElm.scrollTop / this.rowHeight) + 1;
        this.solar_date[index] = parseInt(solarElm.children[childIndex].children[0].innerHTML);
      }
      this.getDayInMonth();
      this.selectedDate = new Departure(new Date(this.solar_date[2] + "-" + this.solar_date[1] + "-" + this.solar_date[0]));
      // console.log(this.solar_date);
      // console.log(this.selectedDate);

      this.mDepartureModule.updateDepartureInfo([this.selectedDate]);
    }
  }
  getDayInMonth() {
    if (this.solar_date[2] % 4 == 0) {
      if (this.solar_date[1] == 2) {
        this.day_in_month = this.day_29;
      } else if (this.solar_date[1] == 4 || this.solar_date[1] == 6 || this.solar_date[1] == 9 || this.solar_date[1] == 11) {
        this.day_in_month = this.day_30;
      } else {
        this.day_in_month = this.datas[0];
      }
    } else {
      if (this.solar_date[1] == 2) {
        this.day_in_month = this.day_28;
      } else if (this.solar_date[1] == 4 || this.solar_date[1] == 6 || this.solar_date[1] == 9 || this.solar_date[1] == 11) {
        this.day_in_month = this.day_30;
      } else {
        this.day_in_month = this.datas[0];
      }
    }
  }
  getSolarDate() {
    if (!this.isScroll) {
      this.viewCtrl.dismiss(this.selectedDate);
    }
  }
}
