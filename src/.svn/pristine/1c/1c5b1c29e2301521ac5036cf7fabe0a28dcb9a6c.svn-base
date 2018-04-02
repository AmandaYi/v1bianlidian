import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Http } from "@angular/http";
import { Ajax } from "../../../../app/ajax";
import { AppConfig } from "../../../../app/app.config";
import { CityPickerService } from "./city-picker";
import { Variable } from "../../../../global/variable";

@Component({
  selector: 'page-createaddress',
  templateUrl: 'createaddress.html'
})
export class CreateaddressPage {


  cityData: any[]; //城市数据
  cityName: string = '北京市 北京市 东城区'; //初始化城市名
  code: string; //城市编码

  provinceNameAdd: any;//省
  provinceNameCode: any;
  cityNameAdd: any;//市
  cityNameCode: any;
  countyNameAdd: any;//区
  countyNameCode: any;

  userId: any;
  tokenId: any;
  name: any;      //收货人
  phone: any;
  address: any = '省市区';
  addressDetail: any;
  checkedDef: any;

  timer: any;//定时器
  timeCount: any;//定时器计数

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
    this.provinceNameAdd = event.province.text;
    this.provinceNameCode = event.province.value;
    this.cityNameAdd = event.city.text;
    this.cityNameCode = event.city.value;
    this.countyNameAdd = event.region.text;
    this.countyNameCode = event.region.value;
    console.log(event);
    this.code = event['region'].value
  }



  getCitiesData() {
    return this.http.get('city-data.json')
      .toPromise()
      .then(response => response.json())
      .catch(err => {
        return Promise.reject(err)
      })

  }
  ionViewDidLoad() {
    this.userId = localStorage.getItem('userId');
    this.tokenId = localStorage.getItem('tokenId');
  }


  //新增收货地址
  goToAddAddress() {
    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }


    //默认设置状态
    if (this.checkedDef == true) {
      this.checkedDef = 1;
    } else {
      this.checkedDef = 0;
    }

    let MOBILE_REGEXP = /^1[3|5|7|8]\d{9}$/;  //手机码号校验

    if (this.name != null && this.name != '') {
      if (this.phone != null && this.phone != '') {
        if (MOBILE_REGEXP.test(this.phone)) {
          let body = {
            passId: this.userId,
            username: this.name,
            mobileno: this.phone,
            provinceId: this.provinceNameCode,
            provinceName: this.provinceNameAdd,
            cityId: this.cityNameCode,
            cityName: this.cityNameAdd,
            countyId: this.countyNameCode,
            countyName: this.countyNameAdd,
            addressDetail: this.addressDetail,
            def: this.checkedDef
          };

          this.http.post(AppConfig.getDebugUrl + '/api/shop/address/msAddress/addOrUpdateAddress', body)
            .toPromise()
            .then(response => {
              if (response.json().code === 200) {
                let toast = this.toastCtrl.create({
                  message: response.json().message,
                  duration: 1000,
                  position: 'top'
                });
                toast.present();
                let BookingAddress = {
                  username: this.name,
                  mobileno: this.phone,
                  provinceName: this.provinceNameAdd,
                  cityName: this.cityNameAdd,
                  countyName: this.countyNameAdd,
                  addressDetail: this.addressDetail
                }
                Variable.getInstance().BookingAddress = BookingAddress;
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