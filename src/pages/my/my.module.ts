//模块引入
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MybookingModule } from "./mybooking/mybooking.module";
import { Camera } from '@ionic-native/camera';
import { CityPickerModule } from "ionic2-city-picker";

//组件、插件、服务引入
import { MyApp } from '../../app/app.component';

//页面引入
import { MyinfoPage } from "./myinfo/myinfo";
import { BindphonePage } from "./bindphone/bindphone";
import { EditpasswordPage } from "./editpassword/editpassword";
import { SuggestionsPage } from "./suggestions/suggestions";
import { MessagePage } from "./message/message";
import { FavoritesPage } from "./favorites/favorites";
import { ShippingaddressPage } from "./shippingaddress/shippingaddress";
import { AboutusPage } from "./aboutus/aboutus";
import { CreateaddressPage } from "./shippingaddress/createaddress/createaddress";
import { EditaddressPage } from "./shippingaddress/editaddress/editaddress";
import { EidtPicPage } from "./myinfo/eidt-pic/eidt-pic";
import { CityPickerService } from "./shippingaddress/createaddress/city-picker";
import { HttpService } from "../../providers/HttpService";
import { getCouponPage } from "./getcoupon/getcoupon";




@NgModule({
  imports: [
    IonicModule.forRoot(MyApp, { backButtonText: '', tabsHideOnSubPages: true, mode: 'ios' }),
    MybookingModule,
    CityPickerModule
    // IonicStorageModule.forRoot()
  ],

  declarations: [
    MyinfoPage,           //用户信息页面
    EidtPicPage,          //修改头像页面
    SuggestionsPage,      //投诉与建议页面
    AboutusPage,          //关于我们页面
    ShippingaddressPage,  //收货地址页面
    CreateaddressPage,    //创建收货地址页面
    FavoritesPage,        //收藏页面
    getCouponPage,           //优惠券页面
    MessagePage,          //消息页面
    BindphonePage,        //绑定手机页面
    EditpasswordPage,     //修改手机页面
    EditaddressPage       //修改收货地址页面
  ],

  entryComponents: [
    MyinfoPage,
    EidtPicPage,
    SuggestionsPage,
    AboutusPage,
    ShippingaddressPage,
    CreateaddressPage,
    FavoritesPage,
    getCouponPage,
    MessagePage,
    BindphonePage,
    EditpasswordPage,
    EditaddressPage
  ],

  providers: [
    HttpService,
    Camera,
    CityPickerService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
    // NativeService
  ],

  exports: [IonicModule]

})

export class MyModule {

}
