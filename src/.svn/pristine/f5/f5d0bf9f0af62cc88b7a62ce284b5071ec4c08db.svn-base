import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AppGlobal } from "../../../../AppGlobal";
import { AppConfig } from "../../../../app/app.config";
import { Ajax } from "../../../../app/ajax";
import { Http } from "@angular/http";

@Component({
  selector: 'page-appraise',
  templateUrl: 'appraise.html'
})
export class AppraisePage {

  tokenId: any;
  shopId: any;
  passId: any;
  orderNo: any;
  score: any = 5;
  comment: any = "";
  commentLength: any;
  userAgent: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appGlobal: AppGlobal,
    private ajax: Ajax,
    private toastCtrl: ToastController,
    public http: Http
  ) {
    this.shopId = navParams.get('shopId');
    this.passId = navParams.get('passId');
    this.orderNo = navParams.get('orderNo');
    this.tokenId = localStorage.getItem('tokenId');
    this.userAgent = localStorage.getItem('userAgent');
  }

  ionViewDidLoad() {
    this.orderDetails();
  }

  orderStatus: any;   //订单状态
  shopid: any;//商铺名称

  roderDetailBox: any;//订单详情信息
  shopName: any//商铺名称
  odProductList: any;//订单产品列表
  orderTotalprice: any;//订单总价
  payTime: any;//支付时间
  prodCount: any;//产品数量
  //订单数据加载
  orderDetails() {
    //查询订单列表
    this.http.get(AppConfig.getDebugUrl + '/api/shop/order/orderBaseInfo?tokenId=' + this.tokenId + '&orderNo=' + this.orderNo+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        this.roderDetailBox = response.json();
        this.shopid = this.roderDetailBox.shopid;
        this.shopName = this.roderDetailBox.shopName;
        this.odProductList = this.roderDetailBox.odProductList;
        this.orderTotalprice = this.roderDetailBox.orderTotalprice;
        this.prodCount = this.roderDetailBox.odProductList.length;
        console.log(response.json());
      })
  }

  appraiseXing() {
    if (this.comment.length > 200) {//内容超出字数范围则返回
      this.appGlobal.showToast('内容超出范围，请重新填写!');
      return;
    }
    if (this.comment.length == 0) {//内容超出字数范围则返回
      this.appGlobal.showToast('请填写内容!');
      return;
    }

    this.ajax.post(AppConfig.getDebugUrl + '/api/shop/info/contContent/addShopComment', {
      shopId: this.shopId,
      passId: this.passId,
      orderNo: this.orderNo,
      score: this.score,
      comment: this.comment
    })
      .toPromise()
      .then(response => {
        if (response.json().code == 200) {
          this.appGlobal.showToast(response.json().message, 2000);
          this.navCtrl.pop();
        } else {
          this.appGlobal.showToast(response.json().message, 2000);
        }
      })
  }

}
