import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ajax } from "../../../../app/ajax";
import { AppConfig } from "../../../../app/app.config";
import { TabsPage } from "../../../tabs/tabs";
import { BookingdetailPage } from "../../../my/mybooking/bookingdetail/bookingdetail";


@Component({
  selector: 'order-fulfillment',
  templateUrl: 'order-fulfillment.html'
})

export class OrderFulfillment {
  userAgent: string;
  constructor(
    public navCtrl: NavController,
    private ajax: Ajax,
    public params: NavParams,
  ) {
    this.userAgent = localStorage.getItem('userAgent');
  }
  orderno: string;//订单编码
  orderId: string;//订单ID
  payTime: string;//支付时间
  userName: string;//收货人
  userAddress: string;//收货地址
  paidIn: number;//实付金额
  ionViewWillEnter() {
    var tokenId = localStorage.getItem('tokenId');
    this.orderno = this.params.get('orderno')
    this.ajax.get(AppConfig.getDebugUrl + '/api/shop/order/orderBaseInfo', { tokenId: tokenId, orderNo: this.orderno, userAgent: this.userAgent })
      .toPromise()
      .then(response => {
        var data = response.json();
        console.log(data)
        this.orderId = data.orderId;
        this.payTime = data.payTime;
        this.userName = data.userName;
        this.userAddress = data.userAddress;
        this.paidIn = data.paidIn;
      })
    this.hided()
  }
  // 跳首页
  homepage() {
    this.navCtrl.push(TabsPage, { indexTab: true }).then(() => {
      this.navCtrl.remove(0, this.navCtrl.length() - 1, null);
    }, () => { })
  }
  // 跳订单详情
  details() {
    this.navCtrl.push(BookingdetailPage, { orderNo: this.orderno, orderStatus: 11 }).then(() => {
      this.navCtrl.remove(1, this.navCtrl.length() - 2, null);
    }, () => { });
  }

  hided() {//触发首页隐藏
    let hid = 0;
    <any>window.parent.postMessage(hid, "*");
  }
}