import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { RegisterPage } from "./register/register";
import { ForgetPage } from "./forget/forget";
import { TabsPage } from "../tabs/tabs";
import { AppConfig } from "../../app/app.config";
import { Ajax } from '../../app/ajax';
import { Variable } from "../../global/variable";
import { Md5 } from "../../providers/md5";
import { AppGlobal } from "../../AppGlobal";


declare var Wechat: any;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  logoImgUrl = "assets/img/Sign_logo@3x.png";
  wexinImgUrl = "assets/img/Sign_wechat@3x.png";
  phoneNo: any;
  password: any;
  //判断ios
  isIos: boolean = Variable.getInstance().isIos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veiwCtrl: ViewController,
    public http: Http,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private ajax: Ajax,
    private appGlobal: AppGlobal
  ) {

  }

  //登录
  goToLogin(e) {

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
    if (this.phoneNo != null && this.phoneNo != '') {
      if (MOBILE_REGEXP.test(this.phoneNo)) {
        if (this.password != null && this.password != '') {
          let pass = Md5.getInstance().hex_md5(this.password)//转换MD5
          return this.http.get(AppConfig.getDebugUrl + '/api/shop/user/msPass/login?eq_account=' + this.phoneNo + '&eq_password=' + pass + '&userAgent=Android')
            .toPromise()
            .then(response => {
              if (response.json().code == 200) {
                if (e === "login") {
                  localStorage.setItem('nickname', response.json().nickname);
                  localStorage.setItem('ifLogin', response.json().code);

                  localStorage.setItem('userId', response.json().passId);
                  localStorage.setItem('tokenId', response.json().tokenId);

                  Variable.getInstance().userid = response.json().passId;
                  Variable.getInstance().tokenid = response.json().tokenId;
                  this.navCtrl.push(TabsPage, { indexTab: true }).then(() => {
                    this.navCtrl.remove(0, this.navCtrl.length() - 1, null);
                  }, () => { });
                } else {
                  this.navCtrl.pop();
                }
              } else {
                this.appGlobal.showToast("账号密码错误!", 2000);
              }
            })
        } else {
          this.appGlobal.showToast("密码不能为空！", 2000);
        }
      } else {
        this.appGlobal.showToast("手机号码格式不对！", 2000);
      }
    } else {
      this.appGlobal.showToast("手机号不能为空！", 2000);
    }
  }


  //微信登录
  wxLogin() {

    //防止多次点击
    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }

    Wechat.isInstalled((installed) => {// 检查是否安装了微信
      // alert("Wechat installed: " + (installed ? "Yes" : "No"));
    }, (reason) => {
      this.appGlobal.showToast("错误信息: " + reason, 2000)
    });

    var scope = "snsapi_userinfo",
      state = "_" + (+new Date());
    Wechat.auth(scope, state, (response) => {
      this.ajax.get(AppConfig.getDebugUrl + '/api/shop/sns/wx/login', { code: response.code, userAgent: 'Android', type: '0' })
        .toPromise()
        .then(response => {

          // let openid: any;//微信用户ID
          // let nickname: any;//微信昵称
          // let provice: any;//省份
          // let country: any;//国家
          // let headimgurl: any;//微信头像url
          // let unionid: any;//微信用户通用ID
          // let language: any;//微信用户语言
          // let passId: any;//用户ID
          // let token: any;//会话密钥
          if (response.json().success == true) {

            //微信成功，设置201为微信登录方式
            localStorage.setItem('ifLogin', '201');

            let wxInfo = response.json();
            Variable.getInstance().wxInfo = wxInfo;

            //储存全局变量
            Variable.getInstance().tokenid = response.json().token;
            Variable.getInstance().userid = response.json().passId;

            //储存localStorage变量
            localStorage.setItem('openid', response.json().openid);
            localStorage.setItem('nickname', response.json().nickname);
            localStorage.setItem('tokenId', response.json().token);
            localStorage.setItem('userId', response.json().passId);
            localStorage.setItem('headimgurl', response.json().headimgurl);
            //储存微信登录后信息为全局变量

            // this.navCtrl.parent.pop();
            //返回首页
            this.navCtrl.push(TabsPage, { indexTab: true }).then(() => {
              this.navCtrl.remove(0, this.navCtrl.length() - 1, null);
            }, () => { });
          } else {
            this.appGlobal.showToast(response.json().errmsg, 2000);
          }
        })
    }, (reason) => {
      this.appGlobal.showToast("错误信息: " + reason, 2000);
    })


  }


  //弹出注册页面
  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  //弹出忘记页面
  goToForgetPage() {
    this.navCtrl.push(ForgetPage).then(() => {
      this.navCtrl.remove(1, this.navCtrl.length() - 2, null);
    }, () => { });
  }


  //清空密码
  resetUsername() {
    this.phoneNo = '';
  }

  //清空密码
  resetPassword() {
    this.password = '';
  }

  //显示密码
  passwordType: any = 'password';
  showPassImg: any = 'assets/img/my_customer_management_not_an@3x.png';
  showPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.showPassImg = this.showPassImg === 'assets/img/my_customer_management_not_an@3x.png' ? 'assets/img/my_customer_management_an@3x.png' : 'assets/img/my_customer_management_not_an@3x.png';
  }

  dismiss() {
    this.veiwCtrl.dismiss();
  }

}
