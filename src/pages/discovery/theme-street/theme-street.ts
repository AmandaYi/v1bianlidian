import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommodityDetails } from '../../home/commodity-details/commodity-details';
import { Ajax } from '../../../app/ajax';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { Variable } from "../../../global/variable";
import { AppConfig } from "../../../app/app.config";
@Component({
  selector: 'theme-street',
  templateUrl: 'theme-street.html'
})
export class ThemeStreet {

  constructor(
    public navCtrl: NavController,
    private ajax: Ajax,
    public params: NavParams
  ) {

  }
  content: string[]; // 活动数据
  mainpic: string;// 活动照片
  totalPages: number;//总页数
  prodPage: number = 0;//商品页码
  dixian: number = 0;//我也有底线

  ionViewDidLoad() {
    this.activity("upTime")
  }

  activity(viod) {
    let actid = this.params.get('actid');
    // 商铺活动详情
    this.ajax.get(AppConfig.getDebugUrl + '/api/shop/act/activity/prods/' + actid + '-' + Variable.getInstance().shopid, { page: 0, size: 20, sort: viod })
      .toPromise()
      .then(response => {
        let data = response.json();
        console.log(data);
        this.mainpic = data.data.mainpic;
        this.content = data.data.content.content;
        this.totalPages=data.data.content.totalPages
      })
  }
  // 商品详情
  SkipDetail(data) {
    this.navCtrl.push(CommodityDetails, { itemid: data })
  }
  sortt1: number = 2;
  sortt2: number = 2;
  SorttRiangle(sort) {
    if (sort == 1) {
      this.sortt1 = (++this.sortt1) % 2;
      if (this.sortt1 == 1) {
        this.activity('salenum,desc')
      }
      if (this.sortt1 == 0) {
        this.activity('salenum')
      }
      this.sortt2 = 3;
    }
    else if (sort == 2) {
      this.sortt2 = (++this.sortt2) % 2;
      if (this.sortt2 == 1) {
        this.activity('price,desc')
      }
      if (this.sortt2 == 0) {
        this.activity('price')
      }
      this.sortt1 = 3;
    }
  }
  default(){
    this.activity('upTime')
  }
  //下拉刷新
  doInfiniteShop(infiniteScroll) {
    let actid = this.params.get('actid');
    let pL: any;
    this.prodPage++;
    if (this.totalPages > 1) {
      if (this.prodPage < this.totalPages) {

        setTimeout(() => {
          this.ajax.get(AppConfig.getDebugUrl + '/api/shop/act/activity/prods/' + actid + '-' + Variable.getInstance().shopid, { page: this.prodPage, size: 20 })
            .toPromise()
            .then(response => {
              pL = response.json().data.content.content;
              for (let i = 0; i < pL.length; i++) {
                this.content.push(pL[i]);
              }
            })
          infiniteScroll.complete();

        }, 1000);

      } else {
        infiniteScroll.complete();
        this.dixian = 1;
      }
    } else {
      infiniteScroll.complete();
      return;
    }


  }
  ionViewWillEnter(){
    // this.hided()
  }
  hided(){//触发首页隐藏
    let hid=0;
    <any>window.parent.postMessage(hid, "*");
  }
}
