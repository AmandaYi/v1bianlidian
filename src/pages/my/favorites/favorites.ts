import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AppConfig } from "../../../app/app.config";
import { AppGlobal } from "../../../AppGlobal";
import { Http } from "@angular/http";
import { Ajax } from "../../../app/ajax";
import { CommodityDetails } from "../../home/commodity-details/commodity-details";
import { Variable } from "../../../global/variable";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  segmentsArray = ['queryFavoritesProd', 'queryFavoritesShop'];
  myFavoritesBox: string = this.segmentsArray[0];
  prodList: any;
  shopList: any;
  shopLenghth: any;
  prodLenghth: any;
  tokenId: any;

  prodPage: any = 0;//商品当前页码
  shopPage: any = 0;//商铺当前页码
  pTotal: any; //商品收藏总页数
  sTotal: any; //商铺收藏总页数
  dixian: any = 0;//我也有底线
  userAgent: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public appGlobal: AppGlobal,
    private toastCtrl: ToastController,
    private ajax: Ajax
  ) {
    //进入页面加载处理
    this.appGlobal.showLoading();
  }



  ionViewWillEnter() {
    this.tokenId = localStorage.getItem('tokenId');
    this.userAgent = localStorage.getItem('userAgent');
    this.queryFavoritesProd();
  }

  //查询收藏商品
  queryFavoritesProd() {
    this.prodPage = 0;
    this.dixian = 0;
    this.http.get(AppConfig.getDebugUrl + '/api/shop/collection/favorite/list/prod-' + Variable.getInstance().shopid + '?tokenid=' + this.tokenId + '&page=' + this.prodPage + '&size=20'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        this.prodList = response.json().content;
        this.pTotal = response.json().totalPages;
        this.prodLenghth = this.prodList.length;
      })
  }

  //查询收藏店铺
  queryFavoritesShop() {
    this.shopPage = 0;
    this.dixian = 0;
    this.http.get(AppConfig.getDebugUrl + '/api/shop/collection/favorite/list/shop-' + Variable.getInstance().shopid + '?tokenid=' + this.tokenId + '&page=' + this.shopPage + '&size=20'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        this.shopList = response.json().content;
        this.sTotal = response.json().totalPages;
        this.shopLenghth = this.shopList.length;
      })
  }


  //取消商品收藏
  cancelFavoriteProd(bid: any) {

    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }

    this.http.get(AppConfig.getDebugUrl + '/api/shop/collection/cancelcollect?bid=' + bid + '&tokenid=' + this.tokenId + '&type=prod'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        if (response.json().code == 200) {
          let toast = this.toastCtrl.create({
            message: response.json().message,
            duration: 2000,
            position: 'top'
          });
          toast.present();
          this.queryFavoritesProd();
        } else {
          let toast = this.toastCtrl.create({
            message: response.json().message,
            duration: 2000,
            position: 'top'
          });
          toast.present();
        }
      })
  }
  //取消商店收藏
  cancelFavoriteShop(bid: any) {
    if (Variable.getInstance().click_flag == false) {
      return;
    } else {
      Variable.getInstance().click_flag = false;
      setTimeout(() => {//一秒后又可以点击
        Variable.getInstance().click_flag = true;
      }, 1000);
    }

    this.http.get(AppConfig.getDebugUrl + '/api/shop/collection/cancelcollect?bid=' + bid + '&tokenid=' + this.tokenId + '&type=shop'+ '&userAgent=' + this.userAgent)
      .toPromise()
      .then(response => {
        if (response.json().code == 200) {
          let toast = this.toastCtrl.create({
            message: response.json().message,
            duration: 2000,
            position: 'top'
          });
          toast.present();
          console.log(response.json());
          this.queryFavoritesShop();
        } else {
          let toast = this.toastCtrl.create({
            message: response.json().message,
            duration: 2000,
            position: 'top'
          });
          toast.present();
        }
      })
  }

  //跳商品详情
  commodityDetails(data) {
    this.navCtrl.push(CommodityDetails, { itemid: data });
  }

  //商品上拉加载
  doInfiniteProd(infiniteScroll) {
    let pL: any;
    if (this.pTotal > 1) {
      if (this.prodPage < this.pTotal) {
        this.prodPage++;
        setTimeout(() => {
          this.http.get(AppConfig.getDebugUrl + '/api/shop/collection/favorite/list/prod?tokenid=' + this.tokenId + '&page=' + this.prodPage + '&size=20'+ '&userAgent=' + this.userAgent)
            .toPromise()
            .then(response => {
              pL = response.json().content;
              for (let i = 0; i < pL.length; i++) {
                this.prodList.push(pL[i]);
              }
            })

          infiniteScroll.complete();
        }, 500);

      } else {
        infiniteScroll.complete();
        this.dixian = 1;
      }
    } else {
      infiniteScroll.complete();
      return;
    }
  }

  //商铺上拉加载
  doInfiniteShop(infiniteScroll) {
    let sL: any;
    if (this.sTotal > 1) {
      if (this.shopPage < this.sTotal) {
        this.shopPage++;
        setTimeout(() => {
          this.http.get(AppConfig.getDebugUrl + '/api/shop/collection/favorite/list/prod?tokenid=' + this.tokenId + '&page=' + this.shopPage + '&size=20'+ '&userAgent=' + this.userAgent)
            .toPromise()
            .then(response => {
              sL = response.json().content;
              for (let i = 0; i < sL.length; i++) {
                this.shopList.push(sL[i]);
              }
            })

          infiniteScroll.complete();
        }, 500);

      } else {
        infiniteScroll.complete();
        this.dixian = 1;
      }
    } else {
      infiniteScroll.complete();
      return;
    }
  }

}
