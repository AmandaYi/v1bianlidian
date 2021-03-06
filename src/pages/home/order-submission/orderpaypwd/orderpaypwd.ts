import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Md5 } from "../../../../providers/md5";
import { AppConfig } from "../../../../app/app.config";
import { AppGlobal } from "../../../../AppGlobal";
import { Ajax } from "../../../../app/ajax";



@Component({
  selector: 'page-orderpaypwd',
  templateUrl: 'orderpaypwd.html',
})
export class OrderpaypwdPage {
  userCode: any; //用户ID
  token: any;    //用户密钥
  constructor(
    public params:NavParams,
    public navCtrl: NavController,
    public navParams: NavParams,
    public appGlobal: AppGlobal,
    public viewCtrl: ViewController,
    public ajax: Ajax
  ) {
    this.userCode = localStorage.getItem('userCode');
    this.token = localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaypwdPage');
    this.params.get('passYes')
    this.params.get('pass')
    
    console.log(this.params.get('passYes'));
    console.log(this.params.get('pass'));
    
    
  }

  pass: any = '';
  changesValue(event) {
    if (event.length == 6) {

      let pass_EXP = /^\d{6}$/;
      if (pass_EXP.test(this.pass)) {
        let p = Md5.getInstance().hex_md5(this.pass)//转换MD5
        this.viewCtrl.dismiss({ passYes: true, pass: p });
        
        // this.ajax.post(AppConfig.getDebugUrl + '/user/payment/password/verify', { token: this.token, userCode: this.userCode, userAgent: AppConfig.userAgent, paypwdmd5: p })
        //   .toPromise()
        //   .then(response => {
        //     console.log(response.json());
        //     if (response.json().code == 200) {
        //       // this.appGlobal.showToast(response.json().message);
              
        //     } else {
        //       this.pass = '';
        //       this.appGlobal.showToast(response.json().message);
        //     }
        //   })
      } else {
        this.appGlobal.showToast("请正确设置6位数字密码！");
      }
    }

  }

  close() {
    this.viewCtrl.dismiss({ passYes: false });
  }


}
