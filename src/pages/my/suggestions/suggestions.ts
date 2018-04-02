import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppConfig } from "../../../app/app.config";
import { HttpService } from "../../../providers/HttpService";
import { AppGlobal } from "../../../AppGlobal";
import { Variable } from "../../../global/variable";
import { Camera } from "@ionic-native/camera";

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-suggestions',
  templateUrl: 'suggestions.html'
})
export class SuggestionsPage {
  Imgs: any = [];//用于上传的路径数组
  path1: string;//图片1的路径
  path2: string;
  path3: string;
  userId: any;//用户ID
  sContent = "";//投诉内容
  shopID: string = Variable.getInstance().shopid;
  nickname: string;//名称
  mobileno:string;//手机号

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veiwCtrl: ViewController,
    private camera: Camera,
    public appGlobal: AppGlobal,
    private httpService: HttpService,
    private sanitizer: DomSanitizer
  ) {

    this.userId = localStorage.getItem('userId');
    this.nickname = localStorage.getItem('nickname');
    this.mobileno=localStorage.getItem('mobileno');
  }

  addPhoto() {//从相册选择

    //code值以‘60’开头，代表是投诉与建议上传图片标记
    let addSugPhoto = {
      code: 601,
      path: ''
    };
    window.parent.postMessage(addSugPhoto, "*");

    window.addEventListener('message', (event) => {
      if (event.data.code == 602) {
        // this.Imgs = event.data.path;
        this.Imgs.push({ path: event.data.path });//添加base64图片
      }
    });

    // var options = {
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // };
    // this.camera.getPicture(options).then((imageData) => {
    //   this.Imgs.push({ path: imageData });//添加base64图片
    // }, (err) => {
    //   // Handle error
    // });
  }


  // imageUrl: any;
  // onChangeSelectFile(event) {
  //   const file = event.currentTarget.files[0];
  //   // this.UserInfo[field] = file;
  //   // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
  //   console.log(file)
  //   this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  // }


  sub() {//提交投诉

    if (Variable.getInstance().click_flag == false) {//防止重复点击
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }

    if (this.sContent.length > 200) {//内容超出字数范围则返回
      this.appGlobal.showToast('内容超出范围，请重新填写!');
      return;
    }
    if (this.sContent.length == 0) {//内容超出字数范围则返回
      this.appGlobal.showToast('请填写内容!');
      return;
    }

    if (this.Imgs.length > 0) {
      this.path1 = this.Imgs[0].path;
    }
    // if (this.Imgs.length > 1) {
    //   this.path2 = this.Imgs[1].path;
    // }
    // if (this.Imgs.length > 2) {
    //   this.path3 = this.Imgs[2].path;
    // }


    this.httpService.post(AppConfig.getDebugUrl + '/api/shop/info/contContent/complain', { passId: this.userId, content: this.sContent, shopId: this.shopID, file1: this.path1, file2: this.path2, file3: this.path3, userName: this.nickname })
      .then(res => {//返回res = Object {code: 200, message: "提交成功"}
        if (res.code == 200) {
          this.appGlobal.showToast(res.message);
          this.navCtrl.pop();
        } else {
          this.appGlobal.showToast('提交失败');
        }
      })
  }

}
