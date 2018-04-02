import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Ajax } from "../../../app/ajax";
import { AppConfig } from "../../../app/app.config";
import { AppGlobal } from "../../../AppGlobal";
import { Variable } from "../../../global/variable";


@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html',
})
export class CouponPage {
  couponNum: any;
  couponArr: any;
  pipeiID: any;
  couponList: any;
  tokenID: any;
  pd: any;
  order: any;
  getHours = new Date().getHours();
  getMinutes = new Date().getMinutes();
  getSeconds = new Date().getSeconds()
  tm: any;
  // 年月日的转换
  now: any
  noneCoupon: boolean = false;
  aName: any;//优惠卷名
  day: any;//当前shij 
  start: any;
  end: any;
  userAgent: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private ajax: Ajax,
    private appGlobal: AppGlobal,
  ) {
    this.couponList = navParams.get('couponArr');
    this.pd = navParams.get('pd');
    this.tokenID = localStorage.getItem('tokenId');
    this.order = navParams.get('order');
    this.aName = navParams.get('couponArr');
    this.userAgent = localStorage.getItem('userAgent');

    for (let i = 0; i < this.aName.length; i++) {
      if (this.aName[i].couponActivity != null && this.aName[i].couponActivity != undefined) {
        if (this.aName[i].couponActivity.liveDays != null && this.aName[i].couponActivity.liveDays != undefined) {
          if ((this.aName[i].couponActivity.createTime != null && this.aName[i].couponActivity.createTime != undefined) || (this.aName[i].couponActivity.downTime != null && this.aName[i].couponActivity.downTime != undefined)) {
            this.aName[i].couponActivity.createTime = this.change(this.aName[i].couponActivity.createTime)
            this.aName[i].couponActivity.downTime = this.change(this.aName[i].couponActivity.downTime)
          }
        } else {
          return;
        }
      }
    }

    console.log(this.aName)
    let sum = 0.00;
    this.tm = this.getHours + ':' + this.getMinutes + ":00"
    // 年月日的转换
    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };
    this.now = formatDate(new Date().getTime());
    this.day = this.change(this.now + ' ' + this.tm)
  }
  ionViewDidEnter() {
    this.reqCoupon();
  }
  change(data) {
    let date = new Date(Date.parse(data.replace(/-/g, "/")));
    return date.getTime();
  }

  getCoupon(couponId: any) {
    //防止多次点击
    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 2000);
    }
    this.ajax.post(AppConfig.getDebugUrl + '/api/shop/couponActivity/receiveCoupon', { tokenId: this.tokenID, couponId: couponId,userAgent: this.userAgent })
      .toPromise()
      .then(res => {
        if (res.json().code == 200) {
          this.appGlobal.showToast(res.json().msg)
          this.reqCoupon();
        } else if (res.json().code == 50002) {
          this.appGlobal.showToast(res.json().msg)
        }
      })
  }

  reqCoupon() {//一进入页面自动获取优惠券ID和会员领取过的ID
    var tokenId = localStorage.getItem('tokenId');
    this.ajax.get(AppConfig.getDebugUrl + '/api/shop/couponActivity/couponActivityListByPassId', { tokenId: tokenId, page: 1, size: 10,userAgent: this.userAgent })
      .toPromise()
      .then(res => {
        this.pipeiID = res.json().content

        this.ajax.get(AppConfig.getDebugUrl + '/api/shop/couponActivity/couponActivityList', { page: 1, size: 10 })
          .toPromise()
          .then(res => {
            if (res.json().content.length == 0) {
              this.noneCoupon = true;
              return;
            }
            this.couponList = res.json().content
            this.couponNum = this.couponList.length;
            for (let i in this.couponList) {
              for (let n in this.pipeiID) {
                if (this.couponList[i].id === this.pipeiID[n].couponActivityId) {
                  this.couponList[i]["isGet"] = '已领取';
                }
              }
            }
          })
      })

  }


  UseCoupons(data) {//用券
    this.viewCtrl.dismiss({ lis: data });
  }
  CancelUse() {
    this.viewCtrl.dismiss({ lis: 'flag_0' });
  }
  close() {//取消
    this.viewCtrl.dismiss();
  }
  cloes() {//取消用卷
    this.viewCtrl.dismiss({ lis: '' });
  }

}
