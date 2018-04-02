import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, Platform, ToastController } from 'ionic-angular';
import { BindphonePage } from "../bindphone/bindphone";
import { Http } from "@angular/http";
import { AppConfig } from "../../../app/app.config";
import { TabsPage } from "../../tabs/tabs";
import { Ajax } from "../../../app/ajax";
import { EditpasswordPage } from "../editpassword/editpassword";
import { EidtPicPage } from "./eidt-pic/eidt-pic";
import { Variable } from "../../../global/variable";


@Component({
  selector: 'page-myinfo',
  templateUrl: 'myinfo.html'
})
export class MyinfoPage {
  mobile: any;//手机号
  tokenId: string;//会话密钥
  userId: string;//用户登录ID
  nickname: any;//昵称
  userSex: any;//性别
  myDate: any;//生日
  headimgurl: any;//头像
  userAgent: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veiwCtrl: ViewController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public http: Http,
    public cd: ChangeDetectorRef,
    private ajax: Ajax,
    private toastCtrl: ToastController
  ) {
    //用户ID
    this.userId = localStorage.getItem('userId');
    this.tokenId = localStorage.getItem('tokenId');
    this.myDate = localStorage.getItem('birthDay');
    this.userSex = localStorage.getItem('userSex');
    this.nickname = localStorage.getItem('nickname');
    this.userAgent = localStorage.getItem('userAgent');
  }
  ionViewWillEnter() {
    //进入页面数据请求
    this.http.get(AppConfig.getDebugUrl + '/api/shop/member/msMember/' + this.userId)
      .toPromise()
      .then(response => {
        // 获取头像
        console.log(response.json());
        if (localStorage.getItem('headimgurl')) {
          this.headimgurl =localStorage.getItem('headimgurl');
        } else {
          if (response.json().code == 200) {
            if (response.json().webAvatarPath == null) {
              this.headimgurl = './assets/img/my_photo_thedefaulf@3x.png';
            } else {
              Variable.getInstance().headimgurl = response.json().webAvatarPath;
              localStorage.setItem('headimgurl', response.json().webAvatarPath);
              this.headimgurl = response.json().webAvatarPath;
            }
          } else {
            this.headimgurl = './assets/img/my_photo_thedefaulf@3x.png';
          }
        }

        //获取昵称
        if (localStorage.getItem('nickname')) {
          this.nickname = localStorage.getItem('nickname');
        } else {
          localStorage.setItem('nickname', response.json().nickname);
          this.nickname = localStorage.getItem('nickname');
          if (this.nickname == 'undefined') this.nickname = '';
          else this.nickname = this.nickname;
        }

        //获取生日
        localStorage.setItem('birthDay', response.json().birthday);
        this.myDate = localStorage.getItem('birthDay');
        if (this.myDate == 'undefined') this.myDate = '';
        else this.myDate = this.myDate;
        //获取生日
        localStorage.setItem('userSex', response.json().sex);
        this.userSex = localStorage.getItem('userSex');
        if (this.userSex == 'undefined') this.userSex = '男';
        else if (this.userSex == '0') this.userSex = '男';
        else this.userSex = '女';
        console.log(response.json());
      })

    //获取电话
    this.http.get(AppConfig.getDebugUrl + '/api/shop/user/msPass/' + this.userId)
      .toPromise()
      .then(response => {
        this.mobile = response.json().mobileno;
      })

    //判断是否已经绑定手机号
    if (this.mobile == undefined) {
      this.mobile = "";
    }

  }

  //进入手机绑定页面
  goToBindphonePage() {
    this.navCtrl.push(BindphonePage);
  }

  //进入修改密码页面
  goToEditpasswordPage() {
    this.navCtrl.push(EditpasswordPage);
  }

  //退出登录
  exitsApp() {
    this.alertCtrl.create({
      title: '确认退出当前账号？',
      buttons: [{ text: '取消' },
      {
        text: '确定',
        handler: () => {
          this.http.post(AppConfig.getDebugUrl + '/api/shop/user/msPass/logout', { tokenid: this.tokenId ,userAgent: this.userAgent})
            .toPromise()
            .then(response => { })

          localStorage.clear();
          sessionStorage.clear();
          let vars = Variable.getInstance();
          vars.tokenid = '';
          vars.userid = '';
          vars.passId = '';
          vars.BookingAddress = {};
          vars.wxInfo = {};
          this.navCtrl.push(TabsPage, { indexTab: true }).then(() => {
            this.navCtrl.remove(0, this.navCtrl.length() - 1, null);
          }, () => { });
          // this.platform.exitApp();
        }
      }
      ]
    }).present();
  }

  //进入上传头像页面
  userPic() {
    this.navCtrl.push(EidtPicPage, { headimgurl: this.headimgurl });
  }


  //修改昵称
  showNickname() {
    let prompt = this.alertCtrl.create({
      title: '修改昵称',
      inputs: [
        {
          name: 'inputNickName',
          placeholder: '昵称(2至8位字符或汉字)',
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '保存',
          handler: data => {
            let NICKNAME_REGEXP = /^[\w\u4e00-\u9fa5]{2,8}$/;  //昵称校验
            if (NICKNAME_REGEXP.test(data.inputNickName)) {
              this.ajax.post(AppConfig.getDebugUrl + '/api/shop/member/msMember/updataData', {
                passId: this.userId,
                nickname: data.inputNickName
              })
                .toPromise()
                .then(response => {

                  let toast = this.toastCtrl.create({
                    message: response.json().message,
                    duration: 2000,
                    position: 'top'
                  });
                  toast.present();
                  this.nickname = data.inputNickName;
                })
            } else {
              let toast = this.toastCtrl.create({
                message: '格式不对，2至8位字符或汉字',
                duration: 2000,
                position: 'top'
              });
              toast.present();
            }

          }
        }
      ]
    });
    prompt.present();
  }


  //修改性别
  showSex() {
    let alert = this.alertCtrl.create();
    alert.setTitle('修改性别');
    alert.addInput({
      type: 'radio',
      label: '男',
      value: '0',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: '女',
      value: '1'
    });

    alert.addButton('取消');
    alert.addButton({
      text: '保存',
      handler: data => {
        // console.log('Checkbox data:', data);
        this.ajax.post(AppConfig.getDebugUrl + '/api/shop/member/msMember/updataData', {
          passId: this.userId,
          Sex: data
        })
          .toPromise()
          .then(response => {

            let toast = this.toastCtrl.create({
              message: response.json().message,
              duration: 2000,
              position: 'top'
            });
            toast.present();
            if (data == '0') this.userSex = '男';
            else this.userSex = '女';
          })
      }
    });
    alert.present();
  }

  //修改生日
  upDateTime() {
    this.ajax.post(AppConfig.getDebugUrl + '/api/shop/member/msMember/updataData', {
      passId: this.userId,
      Birthday: this.myDate
    })
      .toPromise()
      .then(response => {

        let toast = this.toastCtrl.create({
          message: response.json().message,
          duration: 2000,
          position: 'top'
        });
        toast.present();
      })

  }


}
