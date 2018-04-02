import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
import { AppConfig } from "../../../app/app.config";


@Component({
  selector: 'page-getcoupon',
  templateUrl: 'getcoupon.html'
})
export class getCouponPage {
  segmentsArray = ['weishiyong', 'yishiyong', 'yigouqi'];
  getCouponBox: string = this.segmentsArray[0];
  tokenId: any;//会话密钥
  couponList_0: any;//优惠券查询返回对象
  couponList_1: any;
  couponList_2: any;
  status_0: any = 0;//优惠券数量
  status_1: any = 0;
  status_2: any = 0;
  userAgent: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {
      this.userAgent = localStorage.getItem('userAgent');
      this.tokenId = localStorage.getItem('tokenId');
  }



  ionViewDidLoad() {
    this.yigouqi();
    this.yishiyong();
    this.weishiyong();
  }

  weishiyong() {
    return this.http.get(AppConfig.getDebugUrl + '/api/shop/couponActivity/couponActivityListByPassId?tokenId=' + this.tokenId + '&status=0&page=1'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        this.couponList_0 = response.json().content;
        this.status_0 = response.json().totalElements;
      })
      .catch(this.ttError);
  }

  yishiyong() {
    return this.http.get(AppConfig.getDebugUrl + '/api/shop/couponActivity/couponActivityListByPassId?tokenId=' + this.tokenId + '&status=1&page=1'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        this.couponList_1 = response.json().content;
        this.status_1 = response.json().totalElements;
      })
      .catch(this.ttError);
  }

  yigouqi() {
    return this.http.get(AppConfig.getDebugUrl + '/api/shop/couponActivity/couponActivityListByPassId?tokenId=' + this.tokenId + '&status=2&page=1'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        this.couponList_2 = response.json().content;
        this.status_2 = response.json().totalElements;
      })
      .catch(this.ttError);
  }

  private ttError(error: any) {
  }



}
