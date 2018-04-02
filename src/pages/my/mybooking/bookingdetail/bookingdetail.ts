import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AppConfig } from "../../../../app/app.config";
import { Http } from "@angular/http";
import { Variable } from "../../../../global/variable";
import { BookingstatusPage } from "../bookingstatus/bookingstatus";
import { AppGlobal } from "../../../../AppGlobal";
import { Ajax } from "../../../../app/ajax";
import { OrderFulfillment } from "../../../home/order-submission/order-fulfillment/order-fulfillment";
import { AppraisePage } from "../appraise/appraise";

declare var Wechat: any;


@Component({
  selector: 'page-bookingdetail',
  templateUrl: 'bookingdetail.html'
})
export class BookingdetailPage {

  tokenId: any;//会话密钥
  orderNo: any;//订单号
  orderStatus: any;   //订单状态
  shopid: any;//商铺名称
  roderDetailBox: any;//订单详情信息
  shopName: any//商铺名称
  odProductList: any;//订单产品列表
  receivable: any;//应付金额
  paidIn: any;//实付金额
  usedCouponAmount: any;//优惠金额
  transportType: any;//配送方式(0:配送,1:自提)
  userName: any;//收货人
  userMobile: any;//收货人号码
  userAddress: any;//收货地址
  transportStartTime: any;//配送开始时间
  transportEndTime: any;//配送结束时间
  orderTotalprice: any;//订单总价
  payTime: any;//支付时间
  orderMessage: any;//订单留言
  userAgent: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public appGlobal: AppGlobal,
    public alertCtrl: AlertController,
    private ajax: Ajax,
    private toastCtrl: ToastController
  ) {
    //进入页面加载处理
    this.appGlobal.showLoading();
    this.orderNo = navParams.get('orderNo');
    this.orderStatus = navParams.get('orderStatus');
    this.userAgent = localStorage.getItem('userAgent');
  }

  ionViewDidLoad() {
    this.tokenId = localStorage.getItem('tokenId');
    this.orderDetails();
  }

  //订单数据加载
  orderDetails() {
    //查询订单列表
    this.http.get(AppConfig.getDebugUrl + '/api/shop/order/orderBaseInfo?tokenId=' + this.tokenId + '&orderNo=' + this.orderNo+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        Variable.getInstance().orderDetail = response.json();
        this.roderDetailBox = response.json();
        this.shopid = this.roderDetailBox.shopid;
        this.shopName = this.roderDetailBox.shopName;
        this.odProductList = this.roderDetailBox.odProductList;
        this.receivable = this.roderDetailBox.receivable;
        this.paidIn = this.roderDetailBox.paidIn;
        this.usedCouponAmount = this.roderDetailBox.usedCouponAmount;
        this.transportType = this.roderDetailBox.transportType;
        this.userName = this.roderDetailBox.userName;
        this.userMobile = this.roderDetailBox.userMobile;
        this.userAddress = this.roderDetailBox.userAddress;
        this.transportStartTime = this.roderDetailBox.transportStartTime;
        this.transportEndTime = this.roderDetailBox.transportEndTime;
        this.orderTotalprice = this.roderDetailBox.orderTotalprice;
        this.payTime = this.roderDetailBox.payTime;
        this.orderMessage = this.roderDetailBox.orderMessage;
      })
  }

  //订单状态流水
  goToBookingstatusPage(orderNo: any) {
    this.navCtrl.push(BookingstatusPage, { orderNoDetail: orderNo });
  }

  //退款与售后电话
  Customerservice() {
    this.http.get(AppConfig.getDebugUrl + '/api/shop/info/contContent/service-staff?shopId=' + this.shopid)
      .toPromise()
      .then(response => {
        console.log(response.json());
        if (response.json().code == 200) {
          let alert = this.alertCtrl.create({
            title: '服务热线：' + response.json().data[0].telno,
            // subTitle: response.json().data[0].telno,
            buttons: ['确认']
          });
          alert.present();
        } else {
          // let alert = this.alertCtrl.create({
          //   title: response.json().message,
          //   // subTitle: response.json().message,
          //   buttons: ['确认']
          // });
          // alert.present();
        }

      })
  }

  //确认收货
  confirmOrder(orderNo: any) {
    this.ajax.post(AppConfig.getDebugUrl + '/api/shop/order/confirmOrder', { tokenId: this.tokenId, orderNo: orderNo ,userAgent: this.userAgent})
      .toPromise()
      .then(response => {
        if (response.json().code == 200) {
          this.appGlobal.showToast(response.json().msg, 2000);
        } else {
          this.appGlobal.showToast(response.json().msg, 2000);
        }
      })
  }

  openPay(orderno: any) {


    // 微信支付
    this.ajax.get(AppConfig.getDebugUrl + '/api/shop/wxpay/generatePayment', { orderno: orderno, type:0 })
      .toPromise()
      .then(response => {
        let params = {
          partnerid: response.json().result.partnerid, // merchant id 商户id
          prepayid: response.json().result.prepayid, // prepay id 预付id
          noncestr: response.json().result.noncestr, // nonce 随机字符串
          timestamp: response.json().result.timestamp, // timestamp 时间戳
          sign: response.json().result.sign, // signed string 签名
        };
        Wechat.sendPaymentRequest(params, () => {
          // 支付完成跳支付成功页面
          this.navCtrl.push(OrderFulfillment, { orderno: orderno });//支付成功跳支付完成
        }, (reason) => {
          this.appGlobal.showToast("支付失败:" + reason, 2000);
          this.navCtrl.pop();
        });
      })
  }


  //进入商品评价页面
  goToAppraisePage(shopId: any, passId: any, orderNo: any) {
    this.navCtrl.push(AppraisePage, { shopId: shopId, passId: passId, orderNo: orderNo });
  }


}
