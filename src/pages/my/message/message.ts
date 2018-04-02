import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
import { AppConfig } from "../../../app/app.config";
import { AppGlobal } from "../../../AppGlobal";

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  userId: any;
  inforDatas: any;
  inforDatasNull: any;
  mags = new Array();

  constructor(
    public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams,
    public appGlobal: AppGlobal) {
    //进入页面加载处理
    this.appGlobal.showLoading();
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');

    this.http.get(AppConfig.getDebugUrl + '/api/shop/message/msMessage/search?eq_passId=' + this.userId)
      .toPromise()
      .then(response => {
        if (response.json().rows.length > 0) {
          this.mags = response.json().rows;
          this.inforDatas = 1;
          this.inforDatasNull = 0;
        } else {
          this.inforDatas = 0;
          this.inforDatasNull = 1;
        }
      })
  }
  ionViewDidLoad() {
    //  this.userId = localStorage.getItem('userId');

    //   return this.http.get('/api/shop/message/msMessage/search?eq_passId=' + this.userId)
    //     .toPromise()
    //     .then(response => {

    //       this.mags=response.json().rows;

    //       console.log(this.mags);
    //     })
    //     .catch(this.ttError);
  }


}
