import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfig } from "../../../../app/app.config";
import { Http } from "@angular/http";
import { AppGlobal } from "../../../../AppGlobal";

@Component({
  selector: 'page-bookingstatus',
  templateUrl: 'bookingstatus.html'
})
export class BookingstatusPage {

  orderNo: any;//订单号
  orderStatus: any;//状态码,请参照 1.1通用订单状态码定义

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public appGlobal: AppGlobal) {

    this.orderNo = navParams.get('orderNoDetail');
  }

  ionViewDidLoad() {
    this.http.get(AppConfig.getDebugUrl + '/api/shop/orderBaseStatusLog/findOrderBaseStatusLogByOrderNo?orderNo=' + this.orderNo)
      .toPromise()
      .then(response => {
        this.orderStatus = response.json();
      })
  }



}
