import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AppConfig } from "../../../app/app.config";
import { Http } from "@angular/http";
import { Variable } from "../../../global/variable";

@Component({
  selector: 'page-bindphone',
  templateUrl: 'bindphone.html'
})
export class BindphonePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BindphonePage');
    this.phoneCodeBtn = '获取验证码';
    this.sendCode = 'sendCode';
    this.sendCode2 = 'sendCode2 dis';

    this.userId = localStorage.getItem('userId');
  }
  userId: any;
  phoneCodeBtn: any;
  sendCode: any;
  sendCode2: any;
  phoneCodeValue: any;
  timer: any;
  timeCall: any;
  bPhoneNo: any;
  bPhoneCode: any;
  //获取手机验证码
  goToGetCode() {
    //防止多次点击
    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }

    let MOBILE_REGEXP = /^1[3|5|7|8]\d{9}$/;  //手机码号校验
    if (this.bPhoneNo != null && this.bPhoneNo != '') {
      if (MOBILE_REGEXP.test(this.bPhoneNo)) {
        return this.http.get(AppConfig.getDebugUrl + '/api/shop/user/msPass/getVerificationCode?mobile=' + this.bPhoneNo + '&&checkType=1')
          .toPromise()
          .then(response => {
            response.json().data;
            console.log(response.json());
            sessionStorage.setItem('pCode', response.json().code);

            if (sessionStorage.getItem('pCode') === '200') {
              let toast = this.toastCtrl.create({
                message: '已经发送验证码到你手机，请查收！',
                duration: 2000,
                position: 'top'
              });
              toast.present();
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

            } else if (sessionStorage.getItem('pCode') === '300') {
              let toast = this.toastCtrl.create({
                message: '手机号已经注册',
                duration: 2000,
                position: 'top'
              });
              toast.present();
            } else {
              let toast = this.toastCtrl.create({
                message: '服务器忙碌中，请稍后再试！',
                duration: 2000,
                position: 'top'
              });
              toast.present();
            }

          })
      } else {
        let toast = this.toastCtrl.create({
          message: '手机号码格式不对！',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    } else {
      let toast = this.toastCtrl.create({
        message: '手机号不能为空！',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }


  }


  //绑定手机号
  goToBindphone() {
    //防止多次点击
    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }

    let MOBILE_REGEXP = /^1[3|5|7|8]\d{9}$/;  //手机码号校验
    if (this.bPhoneNo != null && this.bPhoneNo != '') {
      if (MOBILE_REGEXP.test(this.bPhoneNo)) {
        if (this.bPhoneCode != null && this.bPhoneCode != '') {
          return this.http.get(AppConfig.getDebugUrl + '/api/shop/user/msPass/resetmobile?eq_mobileno=' + this.bPhoneNo + '&&eq_passId=' + this.userId + '&&verifyCode=' + this.bPhoneCode)
            .toPromise()
            .then(response => {
              console.error(response.json());
              sessionStorage.setItem('bCode', response.json().code);
              sessionStorage.setItem('bms', response.json().message);
              let bms = sessionStorage.getItem('bms');
              let rCode = sessionStorage.getItem('bCode');
              if (rCode === "200") {
                let toast = this.toastCtrl.create({
                  message: bms,
                  duration: 2000,
                  position: 'top'
                });
                toast.present();
                localStorage.removeItem('username');
                this.navCtrl.pop();
              } else {
                let toast = this.toastCtrl.create({
                  message: bms,
                  duration: 2000,
                  position: 'top'
                });
                toast.present();
              }
            })
        } else {
          let toast = this.toastCtrl.create({
            message: '验证码不能为空！',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        }
      } else {
        let toast = this.toastCtrl.create({
          message: '手机号码格式不对！',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    } else {
      let toast = this.toastCtrl.create({
        message: '手机号不能为空！',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }

  }


  //关闭定时器
  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
