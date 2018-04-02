import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import 'rxjs';
import { LoginPage } from "../login/login";
import { MyinfoPage } from "./myinfo/myinfo";
import { SuggestionsPage } from "./suggestions/suggestions";
import { AboutusPage } from "./aboutus/aboutus";
import { ShippingaddressPage } from "./shippingaddress/shippingaddress";
import { FavoritesPage } from "./favorites/favorites";
import { MessagePage } from "./message/message";
import { MybookingPage } from "./mybooking/mybooking";
import { AppConfig } from "../../app/app.config";
import { Http } from "@angular/http";
import { getCouponPage } from "./getcoupon/getcoupon";
import { Variable } from "../../global/variable";

@Component({
  templateUrl: 'my.html'
})
export class MyPage {

  ifLogin: any;//微信手机登录判断
  wxLogin: boolean;//微信登录判断
  onLogin: boolean;//手机登录判断
  inLogin: boolean;//未登录
  userName: any; //用户名为手机号
  tokenId: any;//会话密钥
  userId: any;//消息页面进入判断
  nickname: any; //昵称
  DaiFuKuanTotal: any;//查询待付款总数
  DaiShouKuanTotal: any;//查询待收货总数
  DaiPenJaiTotal: any;//查询待评价总数
  ShouHouTotal: any;//查询退款或售后总数
  headimgurl: any;//头像
  userAgent: string;

  //判断ios
  isIos: boolean = Variable.getInstance().isIos;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: Http
  ) {

  }

  ionViewWillEnter() {
    this.headimgurl = './assets/img/my_photo_thedefaulf@3x.png';
    this.userId = localStorage.getItem('userId');
    this.tokenId = localStorage.getItem('tokenId');
    this.ifLogin = localStorage.getItem('ifLogin');    //获取登录方式
    this.userAgent = localStorage.getItem('userAgent');
    if (this.ifLogin == 200) {    //200为手机方式登录
      this.nickname = localStorage.getItem('nickname');
      this.inLogin = true;
      this.wxLogin = false;
      this.onLogin = false;
    } else if (this.ifLogin == 201) { //201为微信方式登录
      this.nickname = localStorage.getItem('nickname');
      this.inLogin = false;
      this.wxLogin = true;
      this.onLogin = false;
    } else {                          //未登录
      this.inLogin = false;
      this.wxLogin = false;
      this.onLogin = true;
    }

    this.DaiFuKuan();
    this.DaiShouKuan();
    this.DaiPenJai();
    this.ShouHou();
    this.getHeadImgUrl();//获取头像

    // this.hided()
  }

  //获取头像
  getHeadImgUrl() {
    if (localStorage.getItem('headimgurl')) {
      this.headimgurl = localStorage.getItem('headimgurl');
      return;
    } else {
      if (this.userId == null) {
        return;
      } else {
        this.http.get(AppConfig.getDebugUrl + '/api/shop/member/msMember/' + this.userId)
          .toPromise()
          .then(response => {
            // 获取头像
            if (response.json().code == 200) {
              if (response.json().webAvatarPath == null) {
                this.headimgurl = './assets/img/my_photo_thedefaulf@3x.png';
              } else {
                this.headimgurl = response.json().webAvatarPath;
                localStorage.setItem('headimgurl', response.json().webAvatarPath);
              }
            } else {
              this.headimgurl = './assets/img/my_photo_thedefaulf@3x.png';
            }
          });
      }
    }
  }


  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  //进入账号信息页面
  goToMyinfoPage() {
    if (this.ifLogin == null || this.ifLogin == 'undefined') {
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(MyinfoPage);
    }

  }


  //进入投诉建议页面
  goToSuggestionsPage() {
    if (this.ifLogin == null || this.ifLogin == 'undefined') {
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(SuggestionsPage);
    }
  }

  //进入关于我们页面
  goToAboutusPage() {
    this.navCtrl.push(AboutusPage);
  }

  //进入收货地址页面
  goToShippingaddressPage() {
    if (this.ifLogin == null || this.ifLogin == 'undefined') {
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(ShippingaddressPage);
    }
  }

  //进入收藏页面
  goToFavoritesPage() {
    if (this.ifLogin == null || this.ifLogin == 'undefined') {
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(FavoritesPage);
    }
  }

  //进入优惠券页面
  goToCouponPage() {
    if (this.ifLogin == null || this.ifLogin == 'undefined') {
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(getCouponPage);
    }
  }

  //进入消息页面
  goToMessagePage() {
    if (this.ifLogin == null || this.ifLogin == 'undefined') {
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(MessagePage);
    }
  }

  //进入订单页面
  goToMybookingPage(no: any) {
    if (this.ifLogin == null || this.ifLogin == 'undefined') {
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(MybookingPage, { noTab: no });
    }
  }

  //查询待付款总数
  DaiFuKuan() {
    this.http.get(AppConfig.getDebugUrl + '/api/shop/order/queryOrders?tokenId=' + this.tokenId + '&eq_orderStatus=1&page=1'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        if (this.tokenId == null || this.tokenId == 'undefined') {
          this.DaiFuKuanTotal = 0;
        } else {
          this.DaiFuKuanTotal = response.json().totalElements;
        }
      })
  }


  //查询待收货总数
  DaiShouKuan() {
    this.http.get(AppConfig.getDebugUrl + '/api/shop/order/queryOrders?tokenId=' + this.tokenId + '&eq_orderStatus=3&page=1'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        if (this.tokenId == null || this.tokenId == 'undefined') {
          this.DaiShouKuanTotal = 0;
        } else {
          this.DaiShouKuanTotal = response.json().totalElements;
        }
      })
  }

  //查询待评价总数
  DaiPenJai() {
    this.http.get(AppConfig.getDebugUrl + '/api/shop/order/queryOrders?tokenId=' + this.tokenId + '&eq_orderStatus=4&page=1'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        if (this.tokenId == null || this.tokenId == 'undefined') {
          this.DaiPenJaiTotal = 0;
        } else {
          this.DaiPenJaiTotal = response.json().totalElements;
        }

      })
  }

  //查询退款或售后总数
  ShouHou() {
    this.http.get(AppConfig.getDebugUrl + '/api/shop/orderReturn/findOrderReturnList?tokenId=' + this.tokenId + '&page=0'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        if (this.tokenId == null || this.tokenId == 'undefined') {
          this.ShouHouTotal = 0;
        } else {
          this.ShouHouTotal = response.json().totalElements;
        }
      })

  }


  // hided() {//触发首页隐藏
  //   let hid = 1;
  //   <any>window.parent.postMessage(hid, "*");
  // }
}
