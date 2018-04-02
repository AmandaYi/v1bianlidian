import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { AppConfig } from "../../../app/app.config";
import { Ajax } from '../../../app/ajax';
import { Md5 } from "../../../providers/md5";
import { Variable } from "../../../global/variable";
import { AppGlobal } from "../../../AppGlobal";
import { TabsPage } from "../../tabs/tabs";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  phoneNo: any;
  phoneCode: any;
  passwordFirst: any;
  passwordSecond: any;
  phoneCodeBtn: any;
  sendCode: any;
  sendCode2: any;
  phoneCodeValue: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public veiwCtrl: ViewController,
    public http: Http,
    private toastCtrl: ToastController,
    private ajax: Ajax,
    private appGlobal: AppGlobal
  ) {
  }

  ionViewDidLoad() {
    this.phoneCodeBtn = '获取验证码';
    this.sendCode = 'sendCode';
    this.sendCode2 = 'sendCode2 dis';
  }


  timer: any;
  timeCall: any;
  //获取手机验证码
  goToGetCode() {

    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 5000);
    }

    let MOBILE_REGEXP = /^1[3|5|7|8]\d{9}$/;  //手机码号校验
    if (this.phoneNo != null && this.phoneNo != '') {
      if (MOBILE_REGEXP.test(this.phoneNo)) {
        return this.http.get(AppConfig.getDebugUrl + '/api/shop/user/msPass/getVerificationCode?mobile=' + this.phoneNo + '&checkType=0')
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

  //注册用户
  goToRegister() {

    let MOBILE_REGEXP = /^1[3|5|7|8]\d{9}$/;
    let PWD_REGEXP = /(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/;//6~16位数字字母组合
    if (this.phoneNo != null && this.phoneNo != '') {
      if (MOBILE_REGEXP.test(this.phoneNo)) {
        if (this.phoneCode != null && this.phoneCode != '') {
          if (this.passwordFirst != null && this.passwordFirst != '') {
            if (this.passwordSecond != null && this.passwordSecond != '') {
              if (PWD_REGEXP.test(this.passwordFirst) && PWD_REGEXP.test(this.passwordSecond)) {
                if (this.passwordFirst === this.passwordSecond) {

                  let pass1 = Md5.getInstance().hex_md5(this.passwordFirst)//转换MD5
                  let pass2 = Md5.getInstance().hex_md5(this.passwordSecond)//转换MD5

                  return this.ajax.post(AppConfig.getDebugUrl + '/api/shop/user/msPass/register', {
                    eq_mobileno: this.phoneNo,
                    eq_password: pass1,
                    eq_password2: pass2,
                    verifyCode: this.phoneCode,
                    checkType: 2,
                    shopId: Variable.getInstance().shopid
                  })
                    .toPromise()
                    .then(response => {
                      if (response.json().code == 200) {
                        this.appGlobal.showToast(response.json().message, 2000);
                        this.login(this.phoneNo, pass1);
                      } else {
                        this.appGlobal.showToast(response.json().message, 2000);
                      }
                    })
                } else {
                  this.appGlobal.showToast('两次密码不一致，请重新输入！', 2000);
                }
              } else {
                this.appGlobal.showToast('密码为6~16位数字字母组合！', 2000);
              }

            } else {
              this.appGlobal.showToast('密码不能为空！', 2000);
            }

          } else {
            this.appGlobal.showToast('密码不能为空！', 2000);
          }

        } else {
          this.appGlobal.showToast('验证码不能为空！', 2000);
        }

      } else {
        this.appGlobal.showToast('手机号码格式不对！', 2000);
      }
    } else {
      this.appGlobal.showToast('手机号不能为空！', 2000);
    }
  }

  login(a, b) {
    this.http.get(AppConfig.getDebugUrl + '/api/shop/user/msPass/login?eq_account=' + a + '&eq_password=' + b + '&userAgent=Android')
      .toPromise()
      .then(response => {
        if (response.json().code == 200) {
          localStorage.setItem('nickname', response.json().nickname);
          localStorage.setItem('ifLogin', response.json().code);
          localStorage.setItem('userId', response.json().passId);
          localStorage.setItem('tokenId', response.json().tokenId);
          Variable.getInstance().userid = response.json().passId;
          Variable.getInstance().tokenid = response.json().tokenId;
          this.navCtrl.push(TabsPage, { indexTab: true }).then(() => {
            this.navCtrl.remove(0, this.navCtrl.length() - 1, null);
          }, () => { });
        }
      })
  }

  resetphoneNo() {
    this.phoneNo = '';
  }
  resetphoneCode() {
    this.phoneCode = '';
  }
  resetInputFirst() {
    this.passwordFirst = '';
  }
  resetInputSecond() {
    this.passwordSecond = '';
  }

  //显示密码
  passwordType: any = 'password';
  showPassImg: any = 'assets/img/my_customer_management_not_an@3x.png';
  showPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.showPassImg = this.showPassImg === 'assets/img/my_customer_management_not_an@3x.png' ? 'assets/img/my_customer_management_an@3x.png' : 'assets/img/my_customer_management_not_an@3x.png';
  }
}
