import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Http } from "@angular/http";
import { AppConfig } from "../../../../app/app.config";
import { Ajax } from "../../../../app/ajax";
import { CityPickerService } from "../createaddress/city-picker";
import { Variable } from "../../../../global/variable";

@Component({
  selector: 'page-editaddress',
  templateUrl: 'editaddress.html'
})
export class EditaddressPage {
  cityData: any[]; //城市数据
  cityName: string = '北京市 北京市 东城区'; //初始化城市名
  code: string; //城市编码
  provinceNameAdd: any;//省
  provinceNameCode: any;
  cityNameAdd: any;//市
  cityNameCode: any;
  countyNameAdd: any;//区
  countyNameCode: any;
  eAddressId: any;
  eName: any; //收货人
  eMobileno: any; //收货人电话
  eAddress: any; //省市区
  eProvinceName: any;//省
  eCityName: any;//市
  eCountyName: any;//区
  eAddressDetail: any; //详细地址
  eCheckedDef: any; //详细地址
  userId: any;
  tokenId: any;
  userAgent: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ajax: Ajax,
    private toastCtrl: ToastController,
    public http: Http,
    public cityPickerSev: CityPickerService,
    public veiwCtrl: ViewController
  ) {
    this.setCityPickerData();
    this.eAddressId = navParams.get('eAddressId');
    this.eName = navParams.get('eName');
    this.eMobileno = navParams.get('eMobileno');
    this.eProvinceName = navParams.get('eProvinceName');
    this.eCityName = navParams.get('eCityName');
    this.eCountyName = navParams.get('eCountyName');
    this.eAddress = navParams.get('eProvinceName') + '-' + navParams.get('eCityName') + '-' + navParams.get('eCountyName');
    this.eAddressDetail = navParams.get('eAddressDetail');
    this.eCheckedDef = navParams.get('eDef');
    this.userAgent = localStorage.getItem('userAgent');
    this.userId = localStorage.getItem('userId');
    this.tokenId = localStorage.getItem('tokenId');
  }


  ionViewWillEnter() {
    //默认设置状态
    if (this.eCheckedDef == 1) {
      this.eCheckedDef = true;
    } else {
      this.eCheckedDef = false;
    }
  }


  /**
 * 获取城市数据
 */
  setCityPickerData() {
    this.cityPickerSev.getCitiesData()
      .then(data => {
        this.cityData = data;
      });
  }

  /**
   * 城市选择器被改变时触发的事件
   * @param event
   */
  cityChange(event) {
    this.eProvinceName = event.province.text;
    this.eCityName = event.city.text;
    this.eCountyName = event.region.text;
    console.log(event);
    this.code = event['region'].value
  }

  //修改收货地址
  editAddess() {
    //防止多次点击
    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }


    //默认设置状态
    if (this.eCheckedDef == true) {
      this.eCheckedDef = 1;
    } else {
      this.eCheckedDef = 0;
    }
    let MOBILE_REGEXP = /^1[3|5|7|8]\d{9}$/;  //手机码号校验
    if (this.eName != null && this.eName != '') {
      if (this.eMobileno != null && this.eMobileno != '') {
        if (MOBILE_REGEXP.test(this.eMobileno)) {
          let body = {
            addressId: this.eAddressId,
            passId: this.userId,
            username: this.eName,
            mobileno: this.eMobileno,
            provinceName: this.eProvinceName,
            cityName: this.eCityName,
            countyName: this.eCountyName,
            addressDetail: this.eAddressDetail,
            def: this.eCheckedDef
          };
          this.http.post(AppConfig.getDebugUrl + '/api/shop/address/msAddress/addOrUpdateAddress', body)
            .toPromise()
            .then(response => {
              if (response.json().code === 200) {
                let toast = this.toastCtrl.create({
                  message: '修改成功！',
                  duration: 1000,
                  position: 'top'
                });
                toast.present();
                this.navCtrl.pop();
              } else {
                let toast = this.toastCtrl.create({
                  message: response.json().message,
                  duration: 1000,
                  position: 'top'
                });
                toast.present();
              }
            })

        } else {
          let toast = this.toastCtrl.create({
            message: '手机号码格式不对！',
            duration: 1000,
            position: 'top'
          });
          toast.present();
        }

      } else {
        let toast = this.toastCtrl.create({
          message: '手机号不能为空！',
          duration: 1000,
          position: 'top'
        });
        toast.present();
      }
    } else {
      let toast = this.toastCtrl.create({
        message: '收货人不能为空！',
        duration: 1000,
        position: 'top'
      });
      toast.present();
    }
  }

}
