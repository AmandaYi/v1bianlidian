import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ajax } from '../../../../app/ajax';
import { AppConfig } from "../../../../app/app.config";
import { Http } from '@angular/http';

@Component({
  selector: 'list-goods',
  templateUrl: 'list-goods.html'
})
export class ListGoods {
  tokenId: any = localStorage.getItem('tokenId');
  carGoodsIdNum: any = this.params.get('carGoodsIdNum');  // 商品信息ID,商品信息数量
  pitmes: string[];// 商品清单数据
  userAgent: string;

  constructor(
    public navCtrl: NavController,
    private ajax: Ajax,
    public http: Http,
    public params: NavParams) {
      this.userAgent = localStorage.getItem('userAgent');
  }

  ionViewDidLoad() {
    console.log(this.carGoodsIdNum)
    let sum = [];
    for (let i = 0; i < this.carGoodsIdNum.length; i++) {
      sum.push({ itemid: this.carGoodsIdNum[i].id, quantity: this.carGoodsIdNum[i].num })
    }
    // 商品清单接口
    this.http.post(AppConfig.getDebugUrl + '/api/shop/order/orderPreview/getOdProds?' + 'tokenid=' + this.tokenId, { shopid: '10000000030150024', items: sum,userAgent: this.userAgent })
      .toPromise()
      .then(response => {
        this.pitmes = response.json().pitmes;
        console.log(response.json());
      })
  }
  ionViewWillEnter(){
    this.hided()
  }

  hided(){//触发首页隐藏
    let hid=0;
    <any>window.parent.postMessage(hid, "*");
  }
}
