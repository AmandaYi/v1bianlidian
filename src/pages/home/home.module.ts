import { PayboxPage } from './../paybox/paybox';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { NaviMap } from '../../shared/AMap';
import { HomePage } from './home';
import { OrderSubmission } from './order-submission/order-submission';
import { CommodityDetails } from './commodity-details/commodity-details';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { LocationPage } from './location/location';
import { SearchPage } from './search/search';
import { MultiPickerModule } from 'ion-multi-picker';
import { WechatPlugin } from '../../app/wechat-plugin';
import { ListGoods } from './order-submission/list-goods/list-goods';
import { OrderFulfillment } from "./order-submission/order-fulfillment/order-fulfillment";
import { CouponPage } from "./coupon/coupon";
import { SharePage } from "./share/share";
import { AddMap } from "../../shared/addmap";
import { OrderpaypwdPage } from "./order-submission/orderpaypwd/orderpaypwd";
import { SystemBulletin } from "./system-bulletin/systembulletin";
@NgModule({
    declarations: [
 
        HomePage,
        SharePage,         //分享
        OrderSubmission,   //订单提交
        CouponPage,        //优惠券
        CommodityDetails,  //商品详情
        ShoppingCart,      //购物车
        LocationPage,      //店铺选择
        SearchPage,        //搜索
        NaviMap,           //高德
        ListGoods,         //商品清单
        OrderFulfillment,  //支付完成
        AddMap,            //地址高德
        OrderpaypwdPage,    //密码
        SystemBulletin,     //公告  
        PayboxPage,        //支付模态框
    ],
    imports: [IonicModule.forRoot(MyApp, { backButtonText: '', tabsHideOnSubPages: true, mode: 'ios' }), MultiPickerModule],
    entryComponents: [HomePage, SharePage, OrderSubmission, CouponPage, CommodityDetails, ShoppingCart, LocationPage, SearchPage, NaviMap, ListGoods, OrderFulfillment, AddMap, OrderpaypwdPage, SystemBulletin, PayboxPage],
    exports: [IonicModule],
    providers: [WechatPlugin]
})
export class HomeModule { }