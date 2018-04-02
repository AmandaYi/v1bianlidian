import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AppConfig } from "../../../app/app.config";
import { Ajax } from "../../../app/ajax";
import { LoginPage } from "../../login/login";
import { Variable } from "../../../global/variable";
import { Md5 } from "../../../providers/md5";
import { AppGlobal } from "../../../AppGlobal";


@Component({
  selector: 'page-editpassword',
  templateUrl: 'editpassword.html'
})
export class EditpasswordPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private ajax: Ajax,
    private appGlobal: AppGlobal
  ) {

  }
  userId: any;
  ionViewDidLoad() {
    this.userId = localStorage.getItem('userId');
  }

  passwordFirst: any;
  passwordSecond: any;
  timer: any;
  timeCall: any;
  editPassword() {
    let PWD_REGEXP = /(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/;//6~16位数字字母组合
    if (this.passwordFirst != null && this.passwordFirst != '') {
      if (this.passwordSecond != null && this.passwordSecond != '') {
        if (PWD_REGEXP.test(this.passwordFirst) && PWD_REGEXP.test(this.passwordSecond)) {
          if (this.passwordFirst === this.passwordSecond) {
            let pass1 = Md5.getInstance().hex_md5(this.passwordFirst)//转换MD5
            let pass2 = Md5.getInstance().hex_md5(this.passwordSecond)//转换MD5
            return this.ajax.post(AppConfig.getDebugUrl + '/api/shop/user/msPass/updatepassword', { eq_passId: this.userId, eq_password2: pass1, eq_password3: pass2 })
              .toPromise()
              .then(response => {
                if (response.json().code == 200) {
                  this.appGlobal.showToast(response.json().message, 2000);
                  this.timeCall = 3;
                  this.timer = setInterval(() => {
                    if (this.timeCall > 0) {
                      this.timeCall--;
                      localStorage.clear();
                    } else {
                      localStorage.clear();
                      sessionStorage.clear();
                      let vars = Variable.getInstance();
                      vars.tokenid = '';
                      vars.userid = '';
                      vars.passId = '';
                      vars.BookingAddress = {};
                      vars.wxInfo = {};
                      //清空所有变量，然后跳转至登录
                      this.navCtrl.push(LoginPage);
                      this.ngOnDestroy();//关闭定时器
                    }
                  }, 1000);
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
  }


  //关闭定时器
  ngOnDestroy() {
    clearInterval(this.timer);
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
