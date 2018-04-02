import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from "../login";
import { Ajax } from "../../../app/ajax";
import { AppConfig } from "../../../app/app.config";
import { Md5 } from "../../../providers/md5";
import { AppGlobal } from "../../../AppGlobal";

@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html'
})
export class ResetpasswordPage {
  fphone: any;
  fphoneCode: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private ajax: Ajax,
    private appGlobal: AppGlobal
  ) {
    this.fphone = this.navParams.get('phone');
    this.fphoneCode = this.navParams.get('phoneCode');
  }

  ionViewDidLoad() {
  }

  passwordFirst: any;
  passwordSecond: any;
  timer: any;
  timeCall: any;
  resetPassword() {
    let PWD_REGEXP = /(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/;//6~16位数字字母组合
    if (this.passwordFirst != null && this.passwordFirst != '') {
      if (this.passwordSecond != null && this.passwordSecond != '') {
        if (PWD_REGEXP.test(this.passwordFirst) && PWD_REGEXP.test(this.passwordSecond)) {
          if (this.passwordFirst === this.passwordSecond) {
            let pass1 = Md5.getInstance().hex_md5(this.passwordFirst)//转换MD5
            let pass2 = Md5.getInstance().hex_md5(this.passwordSecond)//转换MD5
            return this.ajax.post(AppConfig.getDebugUrl + '/api/shop/user/msPass/resetpassword', { eq_mobileno: this.fphone, verifyCode: this.fphoneCode, eq_password: pass1, eq_password2: pass2 })
              .toPromise()
              //在 promise 的then回调中，我们调用 HTTP 的Reponse对象的json方法，以提取出其中的数据
              .then(response => {
                if (response.json().code == 200) {
                  this.appGlobal.showToast(response.json().message, 2000);
                  this.timeCall = 2;
                  this.timer = setInterval(() => {
                    if (this.timeCall > 0) {
                      this.timeCall--;
                    } else {
                      this.navCtrl.push(LoginPage).then(() => {
                        this.navCtrl.remove(1, this.navCtrl.length() - 2, null);
                      }, () => { });
                      this.ngOnDestroy();//关闭定时器
                    }
                  }, 1000);

                } else {
                  this.appGlobal.showToast(response.json().message, 2000);
                }
              })
          } else {
            this.appGlobal.showToast("两次密码不一致，请重新输入！", 2000);
          }
        } else {
          this.appGlobal.showToast('密码为6~16位数字字母组合！', 2000);
        }

      } else {
        this.appGlobal.showToast("密码不能为空！", 2000);
      }

    } else {
      this.appGlobal.showToast("密码不能为空！", 2000);
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
