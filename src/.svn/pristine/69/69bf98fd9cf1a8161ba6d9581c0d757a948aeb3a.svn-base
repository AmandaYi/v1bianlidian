import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppConfig } from "../../../../app/app.config";
import { HttpService } from "../../../../providers/HttpService";
import { Variable } from "../../../../global/variable";
import { AppGlobal } from "../../../../AppGlobal";
import { Camera } from "@ionic-native/camera";


@Component({
  selector: 'page-eidt-pic',
  templateUrl: 'eidt-pic.html'
})
export class EidtPicPage {
  path: string = '';//用于上传的路径
  profilePicture: string = './assets/img/my_photo_thedefaulf@3x.png';//用户默认头像
  userId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private camera: Camera,
    private httpService: HttpService,
    private appGlobal: AppGlobal
  ) {
    
    this.profilePicture = navParams.get('headimgurl');

    window.addEventListener('message', (event) => {

      if (event.data.code == 712) {
        this.path = event.data.path;//给全局的文件路径赋值。
        this.profilePicture = "data:image/jpeg;base64," + event.data.path;
      }

      if (event.data.code == 722) {
        this.path = event.data.path;//给全局的文件路径赋值。
        this.profilePicture = "data:image/jpeg;base64," + event.data.path;
      }
    });
    
  }

  ionViewWillEnter() {
    this.userId = localStorage.getItem('userId');
  }


  actionList() {
    //   // AppGlobal.getInstance().showMessage('设备不支持!');
    //  if(!AppGlobal.getInstance().ctr_mobile){
    //     AppGlobal.getInstance().showMessage('设备不支持!');
    //     return;
    //   }
    //   if(this.platform.platforms().join("-").indexOf("cordova")==-1){
    //       //平台不支持，控制按钮是否展示
    //         // this.show_pic=false;
    //         AppGlobal.getInstance().showMessage('设备不支持!');
    //         return;
    //     }
  }

  takePhoto() {//拍照

    //code值以‘70’开头，代表是头像上传图片标记
    let addHeadPhoto = {
      code: 711,
      path: ''
    };
    window.parent.postMessage(addHeadPhoto, "*");
  }

  choosePhoto() {//从相册选择
    //code值以‘70’开头，代表是头像上传图片标记
    let addHeadPhoto = {
      code: 721,
      path: ''
    };
    window.parent.postMessage(addHeadPhoto, "*");
  }

  saveAvatar() {//上传图片

    if (Variable.getInstance().click_flag == false) {//防止重复点击
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }

    if (this.path == '') {//判断路径是否为空
      this.appGlobal.showToast('请选择要上传的图片!');
      return;
    };
    this.httpService.post(AppConfig.getDebugUrl + '/api/shop/member/msMember/headImgUpload', { passId: this.userId, file: this.path })
      .then(res => {//数据返回res = Object {code: 200, message: "更新成功"}
        if (res.code == 200) {
          this.appGlobal.showToast(res.message);
          this.path = '';
          localStorage.setItem('headimgurl',this.profilePicture );
        } else {
          this.appGlobal.showToast('更新失败');
        }
      })
  }

}
