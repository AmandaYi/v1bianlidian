import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Ajax } from '../../app/ajax';
import { CommodityDetails } from '../home/commodity-details/commodity-details';
import { ThemeStreet } from './theme-street/theme-street';
import { Variable } from "../../global/variable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { AppConfig } from "../../app/app.config";
import { RecommendToday } from "./recommend-today/recommend-today";
import { HttpService } from "../../providers/HttpService";
import { Http } from "@angular/http";

@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html'
})
export class DiscoveryPage {

  topActItems: any = [];  // 商铺置顶的活动
  recommendItems: any = [];// 今日推荐商品
  toparr: any = [];  // 头部数组
  activityarr: any = []; // 下面的数组

  constructor(
    public navCtrl: NavController,
    private ajax: Ajax,
    private httpService: HttpService,
    private http: Http,
  ) {

  }

  ionViewDidLoad() {
    this.activityarr = [];
    this.toparr = [];
    // 发现接口
    this.http.get(AppConfig.getDebugUrl + '/api/shop/act/activity/getAct/' + Variable.getInstance().shopid, null)
      .toPromise()
      .then(response => {
        let data = response.json();
        this.topActItems = data.topActItems;
        this.recommendItems = data.recommendItems;
        if (data.topActItems[0] != '' && data.topActItems[0] != null) {
          this.toparr.push(data.topActItems[0])
        }
        for (let i = 1; i < this.topActItems.length; i++) {
          this.activityarr.push(this.topActItems[i])
        }
      })

  }
  // 更多
  More() {
    this.navCtrl.push(RecommendToday)
  }
  // 主题街
  SkipTheme(data) {
    this.navCtrl.push(ThemeStreet, { actid: data })
  }
  // 商品详情
  SkipDetail(data) {
    this.navCtrl.push(CommodityDetails, { itemid: data })
  }
  huodong(data) {
    this.navCtrl.push(ThemeStreet, { actid: data })
  }
  mobShare: any;
  ionViewWillEnter(){
    // this.hided()
  }
  hided(){//触发首页隐藏
    let hid=1;
    <any>window.parent.postMessage(hid, "*");
  }
}
