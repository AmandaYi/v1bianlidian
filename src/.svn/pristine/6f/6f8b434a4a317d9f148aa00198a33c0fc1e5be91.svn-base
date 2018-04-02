import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppGlobal } from "../../../AppGlobal";
import { AppConfig } from "../../../app/app.config";

declare var Wechat: any;

@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
  shareUrl: string;
  itemid: any;
  mainpic: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private appGlobal: AppGlobal,
  ) {
    this.mainpic = navParams.get('mainpic');
    this.itemid = navParams.get('itemid')
    if (this.itemid) {
      this.shareUrl = AppConfig.getDebugUrl + '/#/tabs/%E5%85%AD%E6%B2%90%E8%B6%85%E5%B8%82/CommodityDetails/' + this.itemid
    }
  }

  circle() {// 分享朋友圈
    Wechat.share({
      message: {
        title: "分享了一张图片",
        description: "",
        thumb: "",
        mediaTagName: "TEST-TAG-001", //媒体标签名称
        messageExt: "这是第三方带的测试字段",  //信息提取
        messageAction: "<action>dotalist</action>", //信息的作用
        media: {
          type: 4,
          image: this.mainpic,
        }
      },
      scene: Wechat.Scene.TIMELINE   // share to Timeline
    }, () => {
      // alert("Success");
    }, (reason) => {
      this.appGlobal.showToast("错误信息: " + reason)
    });
  }

  friends() {// 分享朋友
    Wechat.share({
      message: {
        title: "六沐便利店",
        description: "",
        thumb: this.mainpic,
        mediaTagName: "TEST-TAG-001", //媒体标签名称
        messageExt: "这是第三方带的测试字段",  //信息提取
        messageAction: "<action>dotalist</action>", //信息的作用
        media: {
          type: 7,
          image: this.mainpic,
          webpageUrl: 'http://wx.lmchaoshi.com'
        }
      },
      scene: Wechat.Scene.SESSION   // share to Timeline
    }, () => {
      // alert("Success");
    }, (reason) => {
      this.appGlobal.showToast("错误信息: " + reason)
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }


}
