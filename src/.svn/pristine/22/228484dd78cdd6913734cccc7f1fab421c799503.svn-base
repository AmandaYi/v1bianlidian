import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { AppConfig } from "../../../app/app.config";
import { ResetpasswordPage } from "../resetpassword/resetpassword";
import { Variable } from "../../../global/variable";
import { AppGlobal } from "../../../AppGlobal";

@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html'
})
export class ForgetPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    public http: Http,
    private appGlobal: AppGlobal
  ) {

  }

  ionViewDidLoad() {
    this.phoneCodeBtn = '获取验证码';
    this.sendCode = 'sendCode';
    this.sendCode2 = 'sendCode2 dis';
  }

  userId: any;
  phoneCodeBtn: any;
  sendCode: any;
  sendCode2: any;
  phoneCodeValue: any;
  timer: any;
  timeCall: any;
  fPhoneNo: any;
  fPhoneCode: any;
  //获取手机验证码
  goToGetCode() {

    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }

    let MOBILE_REGEXP = /^1[3|5|7|8]\d{9}$/; //手机码号校验
    if (this.fPhoneNo != null && this.fPhoneNo != '') {
      if (MOBILE_REGEXP.test(this.fPhoneNo)) {
        return this.http.get(AppConfig.getDebugUrl + '/api/shop/user/msPass/getVerificationCode?mobile=' + this.fPhoneNo + '&&checkType=2')
          .toPromise()
          .then(response => {
            if (response.json().code == 200) {
              this.appGlobal.showToast("已经发送验证码到你手机，请查收！", 2000);
              this.timeCall = 60;
              this.timer = setInterval(() => {
                if (this.timeCall > 0) {
                  this.sendCode2 = "sendCode2";
                  this.sendCode = "sendCode dis";
                  this.phoneCodeBtn = this.timeCall + '后重新获取';
                  this.timeCall--;
                } else {
                  this.sendCode2 = "sendCode2 dis";
                  this.sendCode = "sendCode";
                  this.phoneCodeBtn = '重新获取';
                  this.ngOnDestroy();//关闭定时器
                }
              }, 1000);

            } else if (response.json().code == 300) {
              this.appGlobal.showToast("手机号已经注册！", 2000);
            } else {
              this.appGlobal.showToast("服务器忙碌中，请稍后再试！", 2000);
            }
          })
      } else {
        this.appGlobal.showToast("手机号码格式不对！", 2000);
      }
    } else {
      this.appGlobal.showToast("手机号不能为空！", 2000);
    }


  }

  //关闭定时器
  ngOnDestroy() {
    clearInterval(this.timer);
  }

  resetphoneNo() {
    this.fPhoneNo = '';
  }
  resetphoneCode() {
    this.fPhoneCode = '';
  }


  //弹出重置密码页面
  goToForgetPage() {
    let MOBILE_REGEXP = /^1[3|5|7|8]\d{9}$/; //手机码号校验
    if (this.fPhoneNo != null && this.fPhoneNo != '') {
      if (MOBILE_REGEXP.test(this.fPhoneNo)) {
        if (this.fPhoneCode != null && this.fPhoneCode != '') {
          this.navCtrl.push(ResetpasswordPage, { phone: this.fPhoneNo, phoneCode: this.fPhoneCode }).then(() => {
              this.navCtrl.remove(1, this.navCtrl.length() - 2, null);
            }, () => { });
        } else {
          this.appGlobal.showToast("验证码不能为空！", 2000);
        }

      } else {
        this.appGlobal.showToast("手机号码格式不对！", 2000);
      }
    } else {
      this.appGlobal.showToast("手机号不能为空！", 2000);
    }
  }

}
