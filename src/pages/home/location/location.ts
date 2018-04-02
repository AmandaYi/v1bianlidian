import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../global/variable';
import { AppGlobal } from "../../../AppGlobal";
import { TabsPage } from "../../tabs/tabs";
@Component({
  selector: 'loca-tion',
  templateUrl: 'location.html'
})
export class LocationPage {

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public appGlobal: AppGlobal) {
    this.appGlobal.oNclose(1000);
  }

  Cloud: any;// 云图数据范围检索的
  CloudInf: any;
  mess: any;// 云图数据所有的不包含距离
  StoreInf: any;
  districtList: any;// 省份
  districtL: any;
  locat = false;// 暂时隐藏不用的切换效果
  seles: any = '';
  Locationcity:string;//定位城市
  formattedAddress:string;//通过定位得到的城市

  login() {
    // 云图数据范围检索的
    this.Cloud = JSON.parse(localStorage.getItem('Cloud'));
    this.CloudInf = this.Cloud.datas;
    // 云图数据所有的不包含距离
    this.mess = JSON.parse(localStorage.getItem('mess'));
    this.StoreInf = this.mess.datas;
    console.log(this.StoreInf)
    console.log(this.CloudInf)
    // 省份
    this.districtList = JSON.parse(sessionStorage.getItem('districtList'));
    this.districtL = this.districtList.districtList;
    //城市
    this.Locationcity=Variable.getInstance().Locationcity
    //定位到的城市
    this.formattedAddress=localStorage.getItem('formattedAddress')
  }
  // 暂时隐藏不用
  Reposition() {
    this.locat = true;
  }
  ionViewDidLoad() {//触发定时器操作
    setTimeout(() => {
    this.login()
    }, 2500);
  }
  ionViewWillEnter(){
    // this.hided()
  }
  // 跳转首页
  Supermarket(data, _city) {
    Variable.getInstance().shopid = data;
    Variable.getInstance().formattedAddress = _city;
    // this.navCtrl.pop();
    this.navCtrl.push(TabsPage);
  }

}
