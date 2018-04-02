import { PayboxPage } from './../../paybox/paybox';

import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AppConfig } from '../../../app/app.config';
import { Ajax } from '../../../app/ajax';
import { ListGoods } from './list-goods/list-goods';
import { ShippingaddressPage } from "../../my/shippingaddress/shippingaddress";
import { Variable } from "../../../global/variable";
import { OrderFulfillment } from "./order-fulfillment/order-fulfillment";
import { CouponPage } from "../coupon/coupon";
import { AppGlobal } from "../../../AppGlobal";
import { MybookingPage } from "../../my/mybooking/mybooking";
import { TabsPage } from "../../tabs/tabs";
import { CreateaddressPage } from "../../my/shippingaddress/createaddress/createaddress";
import { OrderpaypwdPage } from "./orderpaypwd/orderpaypwd";
import { JSEncrypt } from "./bin/jsencrypt"
import { HttpService } from "../../../providers/HttpService";
// import { JSEncrypt } from "./bin/jsencrypt"
// import * as JSEncrypt from "jsencrypt"
declare var Wechat: any;
declare var AMap;

@Component({
  selector: 'order-submission',
  templateUrl: 'order-submission.html'
})
export class OrderSubmission {
  carGoodsIdNum: any = [];//存放购物车商品数量和ID
  carPile: any = [];//存放购物车
  testRadioResult: string;
  simpleColumns: any[];
  dependentColumns: any[];
  default: string;  // 时间滚动
  amount: number;// 优惠卷
  codeadd: number;// 获取默认状态码
  provinceName: string = ''; // 省份地址
  cityName: string = '';  // 城市
  countyName: string = '';// 区
  addressDetail: string = '';// 详细地址
  username: string = '';// 用户名
  mobileno: string = ''; // 手机号
  pitmes: string[]; // 商品清单数据
  shopName: string; // 清单店铺
  len: number = 0; // 商品数量
  orderz: number; // 订单总价
  ordery: any; // 应收
  orderNo: string; // 订单号
  now: any // 年月日的转换
  couponType: any//优惠类型
  date: Date = new Date();
  getHours = new Date().getHours();
  getMinutes = new Date().getMinutes();
  newH: number;
  Remarks: string; // 备注
  lei: number;//类商品
  couponArr: any = [];//优惠券数组
  discount: any//折扣
  conditionType: any//使用条件(0:全场)
  threshold: any;//阀值
  timeType: any;//时限类型(0:时间范围,1:天数),注:天数
  liveEndTime: any;//有效结束时间
  liveStartTime: any;//有效开始时间
  liveDays: any;//有效天数
  newData: any;//保存首页传过来的结算数据
  couponActivityId: number;//优惠券ID
  id: number;//用户与优惠券关联ID
  isUseCoupon: number;//是否使用优惠券(0:不使用,1:已使用)
  flag: number = this.params.get('flag');//区分活动价用的
  couponString: string = '选择优惠卷';
  actid: any;//活动ID
  tm: any;
  start: any;
  day: any;
  end: any;
  dsDistance: any;//配送距离
  dsPrice: any;//配送价格
  dsTime: any;//配送时间
  createTime: any//有效天数开始时间
  downTime: any//有效天数结束时间
  create: any;
  down: any;
  coupText:string;//优惠文字



  weChatPayCheck: boolean = false; //选择支付方式
  // 微信支付方式
  weChatPay: any = 0;
  // 支付类型checkbox
  mCardPayCheck: boolean = false;
  choose: any = '请选择支付类型';
  mCardPayCount: any = 0;
  payModelCheck: boolean = false;
  mPaymentType: number;//M卡支付类型(0:余额、1:投资M卡、2:消费M卡、3:投资M卡积分、4:消费M卡积分;高M卡余额=投资M卡，低M卡余额=消费M卡，高M卡积分=投资M卡积分，低M卡积分=消费M卡积分)
  balance: any;
  highBalance: any;
  highremainingpoints: any;
  lowBalance: any;
  lowremainingpoints: any;

  tokenId: string;//miyao
  passId: string;//miyao

  userToken: string;
  userCodes: string;
  userAgent: string;

  dataList: any;//余额数据
  balance1: number;//高额M卡
  type1: string;//高额M卡
  typeId1: number;//高额M卡
  balance2: number;//高额积分
  type2: string;//高额积分
  typeId2: number;//高额积分
  balance3: number;//低额M卡
  type3: string;//低额M卡
  typeId3: number;//低额M卡
  balance4: number;//低额积分
  type4: string;//低额积分
  typeId4: number;//低额积分
  balance0: number;//余额
  type0: string;//余额
  typeId0: number;//余额
  balance5: number;//冻结金额
  type5: string;//冻结金额
  typeId5: number;//冻结金额
  balance6: number;//冻结高额M卡
  type6: string;//冻结高额M卡
  typeId6: number;//冻结高额M卡

  checkedID:number;//选中的id
  die: number = 0;//控制提交订单死去的按钮

  zhekou:number = 0//折扣数
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private ajax: Ajax,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public http: Http,
    public modalCtrl: ModalController,
    public appGlobal: AppGlobal,
    public httpService: HttpService,
  ) {
    this.tokenId = localStorage.getItem('tokenId');
    this.passId = localStorage.getItem('userId');
    this.userToken = localStorage.getItem('userToken');
    this.userCodes = localStorage.getItem('userCodes');
    this.userAgent = localStorage.getItem('userAgent');
    this.dsDistance = localStorage.getItem('dsDistance');
    this.dsPrice = localStorage.getItem('dsPrice');
    this.dsTime = localStorage.getItem('dsTime');
    let openingTime = { from: 8, to: 24 }
    this.simpleColumns = [
      {
        name: 'col1',
        options: [
          // { text: this.getHours + "：00" + '-' + (this.getHours + 1) + '：00', value: this.getHours + "：00" + '-' + (this.getHours + 1) + '：00' }
        ]
      }
    ];
    for (let hour = this.getHours + 1 < openingTime.from ? openingTime.from : this.getHours + 1; hour < openingTime.to; hour++) {
      // this.simpleColumns[0].options.push(`${hour}:00~${hour+1}:00`)
      this.simpleColumns[0].options.push({ text: hour + ':00' + '-' + (hour + 1) + ':00', value: hour + ':00' + '-' + (hour + 1) + ':00' })
    }
    // 年月日的转换
    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };
    this.now = formatDate(new Date().getTime());
    this.isUseCoupon = 0;


     
  }

  ionViewWillEnter() {
    this.qeuryMyWallet()
    window.addEventListener('message', (e) => {
    });
    this.carGoodsIdNum = [];//存放购物车商品数量和ID
    this.carPile = [];//存放购物车
    // this.flag = this.params.get('flag')
    console.log(this.flag)
    if (this.flag == 0) {
      this.carGoodsIdNum = this.params.get('carGoodsIdNum');
      this.carPile = this.params.get('carPile');
    } else
      if (this.flag == 1) {
        this.carGoodsIdNum = this.params.get('carGoodsIdNum');
        this.carPile = this.params.get('carPile');
        console.log(this.carGoodsIdNum)
        console.log(this.carPile)
        // return;
      } else {
        // 购物车列表 
        this.ajax.get(AppConfig.getDebugUrl + '/api/shop/shopcar/odShopcarDetail/list', { shopid: Variable.getInstance().shopid, page: 0, size: 50, tokenid: this.tokenId,userAgent: this.userAgent })
          .toPromise()
          .then(response => {
            for (let i = 0; i < response.json().rows.length; i++) {
              if (response.json().rows[i].prod.actid == null) {
                this.carPile.push({
                  id: response.json().rows[i].prod.pid,
                  ids: response.json().rows[i].prod.itemid,
                  num: response.json().rows[i].car.productQty,
                  name: response.json().rows[i].prod.name,
                  title: response.json().rows[i].prod.ctitle,
                  sprice: response.json().rows[i].prod.sprice,
                  act: null,
                  isUseActivity: 0
                })
              } else {
                this.carPile.push({
                  id: response.json().rows[i].prod.pid,
                  ids: response.json().rows[i].prod.itemid,
                  num: response.json().rows[i].car.productQty,
                  name: response.json().rows[i].prod.name,
                  title: response.json().rows[i].prod.ctitle,
                  sprice: response.json().rows[i].prod.aprice,
                  // aprice: response.json().rows[i].prod.aprice,
                  act: response.json().rows[i].prod.actid,
                  isUseActivity: 1
                })
              }
              this.carGoodsIdNum.push({ id: response.json().rows[i].car.itemid, num: response.json().rows[i].car.productQty })

            }
          })
        // 购物车数量
        this.ajax.get(AppConfig.getDebugUrl + '/api/shop/shopcar/odShopcarDetail/shpocarinfo/' + Variable.getInstance().shopid, { tokenid: this.tokenId,userAgent: this.userAgent })
          .toPromise()
          .then(response => {
            this.newData = response.json().data;
          })
      }
    this.ReceivingAddress()

    // this.hided();

    this.shopkind();
  }
  ngOnInit() {
    this.ReceivingAddress()
  }
  map: any;//地图对象
  ReceivingAddress() {
    let that = this;
    // let geolocation: any;
    that.map = new AMap.Map('container', {
      view: new AMap.View2D({//创建地图二维视口
        zoom: 11, //设置地图缩放级别
        rotateEnable: true,
        showBuildingBlock: true
      })
    });
    if (Variable.getInstance().adds == 1) {
      // 获取默认地址
      this.ajax.get(AppConfig.getDebugUrl + '/api/shop/address/msAddress/getAddressDefByPassId', { passId: this.passId })
        .toPromise()
        .then(response => {
          let data = response.json();
          this.codeadd = data.code
          if (data.code == 200) {
            this.provinceName = data.provinceName;
            this.cityName = data.cityName;
            this.countyName = data.countyName;
            this.addressDetail = data.addressDetail;
            this.username = data.username;
            this.mobileno = data.mobileno;
            Variable.getInstance().Wholly = data.provinceName + data.cityName + data.countyName + data.addressDetail;
            Variable.getInstance().cit = data.cityName;
            //正地理编码
            AMap.service(["AMap.Geocoder"], function () {
              let ln = sessionStorage.getItem('ln')
              let la = sessionStorage.getItem('la')
              var geocoder = new AMap.Geocoder({
                city: Variable.getInstance().cit, //城市，默认：“全国”
                radius: 1000 //范围，默认：500
              });
              geocoder.getLocation(Variable.getInstance().Wholly, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  let lat = result.geocodes[0].location.lat;
                  let lng = result.geocodes[0].location.lng;
                  //两点计算
                  var lnglat = new AMap.LngLat(lng, lat);
                  var myDistance1 = lnglat.distance([ln, la])
                  console.log(myDistance1)
                  Variable.getInstance().distance = myDistance1
                }
              });
            });
          }
        })
    } if (Variable.getInstance().adds == 2) {
      this.provinceName = Variable.getInstance().BookingAddress.provinceName;
      this.cityName = Variable.getInstance().BookingAddress.cityName;
      this.countyName = Variable.getInstance().BookingAddress.countyName;
      this.addressDetail = Variable.getInstance().BookingAddress.addressDetail;
      this.username = Variable.getInstance().BookingAddress.username;
      this.mobileno = Variable.getInstance().BookingAddress.mobileno;
      Variable.getInstance().adds = 1;
      Variable.getInstance().Wholly = Variable.getInstance().BookingAddress.provinceName + Variable.getInstance().BookingAddress.cityName + Variable.getInstance().BookingAddress.countyName + Variable.getInstance().BookingAddress.addressDetail;
      Variable.getInstance().cit = Variable.getInstance().BookingAddress.cityName;
      //正地理编码
      AMap.service(["AMap.Geocoder"], function () {
        let ln = sessionStorage.getItem('ln')
        let la = sessionStorage.getItem('la')
        var geocoder = new AMap.Geocoder({
          city: Variable.getInstance().cit, //城市，默认：“全国”
          radius: 1000 //范围，默认：500
        });
        geocoder.getLocation(Variable.getInstance().Wholly, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            let lat = result.geocodes[0].location.lat;
            let lng = result.geocodes[0].location.lng;
            //两点计算
            var lnglat = new AMap.LngLat(lng, lat);
            var myDistance1 = lnglat.distance([ln, la])
            console.log(myDistance1)
            Variable.getInstance().distance = myDistance1
          }
        });
      });
    }
  }
  ionViewDidEnter() {
    this.datalis()
    //优惠卷
    this.ajax.get(AppConfig.getDebugUrl + '/api/shop/couponActivity/couponActivityListByPassId', { tokenId: this.tokenId, status: 0, page: 1, size: 8,userAgent: this.userAgent })
      .toPromise()
      .then(response => {
        var data = response.json();
        if (data.content.length > 0) {
          this.couponArr = data.content;
        }

      })
  }
  datalis() {//进来加载的数据
    let ncm = [];
    this.pitmes = [];
    this.len = 0;
    if (this.carGoodsIdNum.length > 0) {
      this.lei = this.carGoodsIdNum.length;
      for (let i = 0; i < this.carGoodsIdNum.length; i++) {
        ncm.push({ itemid: this.carGoodsIdNum[i].id, quantity: this.carGoodsIdNum[i].num })
        let a = this.carGoodsIdNum[i].num;
        this.len = this.len + a
      }

      if (this.newData) {
        this.len = this.newData.totalCount;
        this.lei = ncm.length;
      }
      else {
        this.len = this.carGoodsIdNum.length;
      }
      // 商品清单接口
      this.http.post(AppConfig.getDebugUrl + '/api/shop/order/orderPreview/getOdProds?' + 'tokenid=' + this.tokenId+ '&userAgent=' + this.userAgent, { shopid: Variable.getInstance().shopid, items: ncm, tokenid: this.tokenId,userAgent: this.userAgent })
        .toPromise()
        .then(res => {
          if (res.json().code == 200) {
            let aaa = res.json().pitmes
            if (aaa.length > 4) {
              for (let i = 0; i < 4; i++) {
                this.pitmes.push(aaa[i])
              }
            }
            if (aaa.length <= 4) {
              for (let i = 0; i < aaa.length; i++) {
                this.pitmes.push(aaa[i])
              }
            }
            this.shopName = res.json().shopName
          } else {
            this.appGlobal.showToast('服务异常')
          }

        })
    }

    let sum = 0.00;
    for (let i = 0; i < this.carPile.length; i++) {
      sum += (this.carPile[i].num * this.carPile[i].sprice) * 100;
    }
    // if (this.testRadioResult == '自提') {
      if (this.newData) {
        this.orderz = this.appGlobal.returnFloat(this.newData.totalPrice)
        this.ordery = this.appGlobal.returnFloat(this.newData.totalPrice)
      } else {
        this.orderz = this.appGlobal.returnFloat(sum / 100);// 订单总价
        this.ordery = this.appGlobal.returnFloat(sum / 100);// 应收
      }
    // } else if (this.testRadioResult == '配送') {
    //   if (this.newData) {
    //     this.orderz = this.appGlobal.returnFloat(this.newData.totalPrice);
    //     // if (this.orderz + this.dsPrice > 0) {
    //     //   this.ordery = this.appGlobal.returnFloat(this.newData.totalPrice) + this.dsPrice;
    //     // } else {
    //     //   this.ordery = 0;
    //     // }

    //   } else {
    //     this.orderz = this.appGlobal.returnFloat(sum / 100);// 订单总价
    //     // if (this.orderz + this.dsPrice > 0) {
    //     //   this.ordery = this.appGlobal.returnFloat(sum / 100) + this.dsPrice;// 应收
    //     // } else {
    //     //   this.ordery = 0
    //     // }

    //   }
    // }
  }

  change(data) {
    let date = new Date(Date.parse(data.replace(/-/g, "/")));
    return date.getTime();
  }

  PreferentialOpe() {
    let sum = 0.00;
    this.tm = this.getHours + ':' + this.getMinutes + ":00"
    this.start = this.change(this.liveStartTime)
    this.day = this.change(this.now + ' ' + this.tm)
    this.end = this.change(this.liveEndTime)
    this.create = this.change(this.createTime)
    this.down = this.change(this.downTime)
    for (let i = 0; i < this.carPile.length; i++) {
      sum += (this.carPile[i].num * this.carPile[i].sprice) * 100;
    }
    if (this.isUseCoupon == 1) {
      if (this.liveDays != null) {
        if (this.orderz < this.threshold || this.create > this.day || this.down < this.day) {
          this.couponString = '优惠卷没有达到使用条件';
        }
      } else {
        if (this.orderz < this.threshold || this.start > this.day || this.end < this.day) {
          this.couponString = '优惠卷没有达到使用条件';
        }
      }

    }
    if (this.isUseCoupon == 1) {
      if (this.liveDays != null) {
        if (this.amount != null && this.orderz >= this.threshold && this.create <= this.day && this.down >= this.day) {
          this.couponString = '优惠' + this.amount + '元';
        }
      } else {
        if (this.amount != null && this.orderz >= this.threshold && this.start <= this.day && this.end >= this.day) {
          this.couponString = '优惠' + this.amount + '元';
        }
      }

    }
    // if (this.testRadioResult == '自提') {
    if (this.liveDays != null) {
      if (this.newData) {
        this.orderz = this.newData.totalPrice;
        let yingshou = this.newData.totalPrice;
        if (this.orderz >= this.threshold && this.couponType == 0 && this.create <= this.day && this.down >= this.day) {
          if (yingshou - this.amount <= 0) {
            this.ordery = 0;// 应收
          } else {
            this.ordery = yingshou - this.amount;// 应收
            this.ordery = this.appGlobal.returnFloat(this.ordery)
          }
        } else if (this.orderz >= this.threshold && this.couponType == 1 && this.create <= this.day && this.down >= this.day) {
          if (yingshou * (this.discount / 100) <= 0) {
            this.ordery = 0;// 应收
          } else {
            this.ordery = yingshou * (this.discount / 100);// 应收
            this.ordery = this.appGlobal.returnFloat(this.ordery)
          }
        }
      } else {
        if (this.orderz >= this.threshold && this.couponType == 0 && this.create <= this.day && this.down >= this.day) {
          if ((sum / 100) - this.amount <= 0) {
            this.ordery = 0;// 应收
          } else {
            this.ordery = (sum / 100) - this.amount;// 应收
            this.ordery = this.appGlobal.returnFloat(this.ordery)
          }
        } else
          if (this.orderz >= this.threshold && this.couponType == 1 && this.create <= this.day && this.down >= this.day) {
            if ((sum / 100) * (this.discount / 100) <= 0) {
              this.ordery = 0;// 应收
            } else {
              this.ordery = (sum / 100) * (this.discount / 100);// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            }
          }
      }
    } else {
      if (this.newData) {
        this.orderz = this.newData.totalPrice;
        let yingshou = this.newData.totalPrice;
        if (this.orderz >= this.threshold && this.couponType == 0 && this.start <= this.day && this.end >= this.day) {
          if (yingshou - this.amount <= 0) {
            this.ordery = 0;// 应收
          } else {
            this.ordery = yingshou - this.amount;// 应收
            this.ordery = this.appGlobal.returnFloat(this.ordery)
          }
        } else if (this.orderz >= this.threshold && this.couponType == 1 && this.start <= this.day && this.end >= this.day) {
          if (yingshou * (this.discount / 100) <= 0) {
            this.ordery = 0;// 应收
          } else {
            this.ordery = yingshou * (this.discount / 100);// 应收
            this.ordery = this.appGlobal.returnFloat(this.ordery)
          }
        }
      } else {
        if (this.orderz >= this.threshold && this.couponType == 0 && this.start <= this.day && this.end >= this.day) {
          if ((sum / 100) - this.amount <= 0) {
            this.ordery = 0;// 应收
          } else {
            this.ordery = (sum / 100) - this.amount;// 应收
            this.ordery = this.appGlobal.returnFloat(this.ordery)
          }
        } else
          if (this.orderz >= this.threshold && this.couponType == 1 && this.start <= this.day && this.end >= this.day) {
            if ((sum / 100) * (this.discount / 100) <= 0) {
              this.ordery = 0;// 应收
            } else {
              this.ordery = (sum / 100) * (this.discount / 100);// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            }
          }
      }
    }

    // } else if (this.testRadioResult == '配送') {
    //   if (this.liveDays != null) {
    //     if (this.newData) {
    //       this.orderz = this.newData.totalPrice;
    //       let yingshou = this.newData.totalPrice;
    //       if (this.orderz >= this.threshold && this.couponType == 0 && this.create <= this.day && this.down >= this.day) {
    //         if (yingshou - this.amount + this.dsPrice <= 0) {
    //           this.ordery = 0;// 应收
    //         } else {
    //           this.ordery = yingshou - this.amount + this.dsPrice;// 应收
    //           this.ordery = this.appGlobal.returnFloat(this.ordery);
    //         }
    //       } else if (this.orderz >= this.threshold && this.couponType == 1 && this.create <= this.day && this.down >= this.day) {
    //         if (yingshou * (this.discount / 100) + this.dsPrice <= 0) {
    //           this.ordery = 0;// 应收
    //         } else {
    //           this.ordery = yingshou * (this.discount / 100) + this.dsPrice;// 应收
    //           this.ordery = this.appGlobal.returnFloat(this.ordery)
    //         }
    //       }
    //     } else {
    //       if (this.orderz >= this.threshold && this.couponType == 0 && this.create <= this.day && this.down >= this.day) {
    //         if ((sum / 100) - this.amount + this.dsPrice <= 0) {
    //           this.ordery = 0;// 应收
    //         } else {
    //           this.ordery = (sum / 100) - this.amount + this.dsPrice;// 应收
    //           this.ordery = this.appGlobal.returnFloat(this.ordery)
    //         }
    //       } else if (this.orderz >= this.threshold && this.couponType == 1 && this.create <= this.day && this.down >= this.day) {
    //         if ((sum / 100) * (this.discount / 100) + this.dsPrice <= 0) {
    //           this.ordery = 0;// 应收
    //         } else {
    //           this.ordery = (sum / 100) * (this.discount / 100) + this.dsPrice;// 应收
    //           this.ordery = this.appGlobal.returnFloat(this.ordery)
    //         }
    //       }
    //     }
    //   } else {
    //     if (this.newData) {
    //       this.orderz = this.newData.totalPrice;
    //       let yingshou = this.newData.totalPrice;
    //       if (this.orderz >= this.threshold && this.couponType == 0 && this.start <= this.day && this.end >= this.day) {
    //         if (yingshou - this.amount + this.dsPrice <= 0) {
    //           this.ordery = 0;// 应收
    //         } else {
    //           this.ordery = yingshou - this.amount + this.dsPrice;// 应收
    //           this.ordery = this.appGlobal.returnFloat(this.ordery);
    //         }
    //       } else if (this.orderz >= this.threshold && this.couponType == 1 && this.start <= this.day && this.end >= this.day) {
    //         if (yingshou * (this.discount / 100) + this.dsPrice <= 0) {
    //           this.ordery = 0;// 应收
    //         } else {
    //           this.ordery = yingshou * (this.discount / 100) + this.dsPrice;// 应收
    //           this.ordery = this.appGlobal.returnFloat(this.ordery)
    //         }
    //       }
    //     } else {
    //       if (this.orderz >= this.threshold && this.couponType == 0 && this.start <= this.day && this.end >= this.day) {
    //         if ((sum / 100) - this.amount + this.dsPrice <= 0) {
    //           this.ordery = 0;// 应收
    //         } else {
    //           this.ordery = (sum / 100) - this.amount + this.dsPrice;// 应收
    //           this.ordery = this.appGlobal.returnFloat(this.ordery)
    //         }
    //       } else if (this.orderz >= this.threshold && this.couponType == 1 && this.start <= this.day && this.end >= this.day) {
    //         if ((sum / 100) * (this.discount / 100) + this.dsPrice <= 0) {
    //           this.ordery = 0;// 应收
    //         } else {
    //           this.ordery = (sum / 100) * (this.discount / 100) + this.dsPrice;// 应收
    //           this.ordery = this.appGlobal.returnFloat(this.ordery)
    //         }
    //       }
    //     }
    //   }

    // }

  }
  // 收货地址
  address() {
    // Variable.getInstance().adds = 1
    this.navCtrl.push(ShippingaddressPage, { adds: Variable.getInstance().adds });
  }
  //新建收货地址
  Newaddress() {
    this.navCtrl.push(CreateaddressPage)
  }
  // 跳回店铺
  store() {
    // this.navCtrl.pop();
    this.navCtrl.push(TabsPage).then(() => {
      this.navCtrl.remove(0, this.navCtrl.length() - 1, null);
    }, () => { })
  }
  // 商品清单
  DetailedList() {
    this.navCtrl.push(ListGoods, { carGoodsIdNum: this.carGoodsIdNum });
  }
  // 配送方式
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('配送方式');
    alert.addInput({
      type: 'radio',
      label: '自提',
      value: '自提',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: '配送',
      value: '配送'
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确认',
      handler: data => {
        console.log(data);
        
        this.testRadioResult = data;
        this.datalis();
      }
    });
    alert.present();
  }
  // 优惠券
  Coupon() {
    let flag_true;
    let sum = 0.00;
    if (this.couponArr == 0) {
      this.appGlobal.showToast('暂无优惠券', 2000)
      return;
    }
    for (let i = 0; i < this.carPile.length; i++) {
      sum += (this.carPile[i].num * this.carPile[i].sprice) * 100;
    }
    for (let i = 0; i < this.carPile.length; i++) {
      if (this.carPile[i].isUseActivity == 1) {
        flag_true = false;
        break;
      }
    }
    if (flag_true == false) {
      this.appGlobal.showToast('折扣商品不能使用优惠卷')
      return;
    } else {
      let modal = this.modalCtrl.create(CouponPage, { couponArr: this.couponArr, pd: 2, order: this.orderz })
      modal.onDidDismiss(data => {
        if (data.lis == 'flag_0') {
          this.isUseCoupon = 0;
          this.couponString = '选择优惠券';
          if (this.testRadioResult == '自提') {
            this.ordery = sum / 100;// 应收
            this.ordery = this.appGlobal.returnFloat(this.ordery)
          } else if (this.testRadioResult == '配送') {
            if ((sum / 100) + this.dsPrice > 0) {
              this.ordery = sum / 100 + this.dsPrice;// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            } else {
              this.ordery = 0;// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            }

          }
          return;
        } else if (data.lis != '') {
          this.couponString = '';
          this.threshold = data.lis.couponActivity.threshold;//阀值
          this.amount = data.lis.couponActivity.amount;//优惠金额,(在满减优惠时使用)
          this.couponType = data.lis.couponActivity.couponType;//优惠类型
          this.discount = data.lis.couponActivity.discount;//折扣
          this.conditionType = data.lis.couponActivity.conditionType;//使用条件(0:全场)
          this.timeType = data.lis.couponActivity.timeType;//时限类型(0:时间范围,1:天数),注:天数
          this.liveStartTime = data.lis.lifeStartTime;//有效开始时间
          this.liveEndTime = data.lis.lifeEndTime;//有效结束时间
          this.liveDays = data.lis.couponActivity.liveDays;//有效天数
          this.createTime = data.lis.couponActivity.createTime;//有效天数开始时间
          this.downTime = data.lis.couponActivity.downTime;//有效天数结束时间
          this.couponActivityId = data.lis.couponActivityId;//优惠券ID
          this.id = data.lis.id;//用户与优惠券关联ID
          this.isUseCoupon = 1; //优惠卷使用状态

          // if (this.testRadioResult == '自提') {
          if (this.liveDays != null) {
            if (this.orderz < this.threshold) {
              this.ordery = sum / 100;// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            }
            else if (this.create > this.day) {
              this.ordery = sum / 100;// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            }
            else if (this.down < this.day) {
              this.ordery = sum / 100;// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            }
          } else {
            if (this.orderz < this.threshold) {
              this.ordery = sum / 100;// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            }
            else if (this.start > this.day) {
              this.ordery = sum / 100;// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            }
            else if (this.end < this.day) {
              this.ordery = sum / 100;// 应收
              this.ordery = this.appGlobal.returnFloat(this.ordery)
            }
          }

          // } else if (this.testRadioResult == '配送') {
          //   if (this.liveDays != null) {
          //     if (this.orderz < this.threshold) {
          //       if (sum / 100 + this.dsPrice > 0) {
          //         this.ordery = sum / 100 + this.dsPrice;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       } else {
          //         this.ordery = 0;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       }
          //     } else if (this.create > this.day) {
          //       if (sum / 100 + this.dsPrice > 0) {
          //         this.ordery = sum / 100 + this.dsPrice;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       } else {
          //         this.ordery = 0;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       }
          //     } else if (this.down < this.day) {
          //       if (sum / 100 + this.dsPrice > 0) {
          //         this.ordery = sum / 100 + this.dsPrice;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       } else {
          //         this.ordery = 0;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       }
          //     }
          //   } else {
          //     if (this.orderz < this.threshold) {
          //       if (sum / 100 + this.dsPrice > 0) {
          //         this.ordery = sum / 100 + this.dsPrice;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       } else {
          //         this.ordery = 0;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       }
          //     } else if (this.start > this.day) {
          //       if (sum / 100 + this.dsPrice > 0) {
          //         this.ordery = sum / 100 + this.dsPrice;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       } else {
          //         this.ordery = 0;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       }
          //     } else if (this.end < this.day) {
          //       if (sum / 100 + this.dsPrice > 0) {
          //         this.ordery = sum / 100 + this.dsPrice;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       } else {
          //         this.ordery = 0;// 应收
          //         this.ordery = this.appGlobal.returnFloat(this.ordery)
          //       }
          //     }
          //   }

          // }
          this.PreferentialOpe()

        }
      })
      modal.present();
    }
  }

  //查询我的余额
  qeuryMyWallet() {
    this.ajax.get(AppConfig.getDebugUrl + '/api/shop/lmcard/getBalanceAll', { userToken: this.userToken, userCode: this.userCodes, userAgent: this.userAgent })
      .toPromise()
      .then(response => {
        console.log(response)
        if (response.json().resultCode == 200) {
          this.dataList = response.json().dataList;

          for (let i = 0; i < response.json().dataList.length; i++) {
            if (response.json().dataList[i].typeId == 1) {
              if (response.json().dataList[i].balance > 0) {
                this.balance1 = response.json().dataList[i].balance;
              } else {
                this.balance1 = 0;
              }
              this.type1 = response.json().dataList[i].type;
              this.typeId1 = response.json().dataList[i].typeId;
            } else if (response.json().dataList[i].typeId == 2) {
              if (response.json().dataList[i].balance > 0) {

                console.log(response.json().dataList[i].balance)

                this.balance2 = response.json().dataList[i].balance;
              } else {
                this.balance2 = 0;
              }
              this.type2 = response.json().dataList[i].type;
              this.typeId2 = response.json().dataList[i].typeId;
            } else if (response.json().dataList[i].typeId == 3) {
              if (response.json().dataList[i].balance > 0) {
                this.balance3 = response.json().dataList[i].balance;
              } else {
                this.balance3 = 0;
              }
              this.type3 = response.json().dataList[i].type;
              this.typeId3 = response.json().dataList[i].typeId;
            } else if (response.json().dataList[i].typeId == 4) {
              if (response.json().dataList[i].balance > 0) {
                this.balance4 = response.json().dataList[i].balance;
              } else {
                this.balance4 = 0;
              }
              this.type4 = response.json().dataList[i].type;
              this.typeId4 = response.json().dataList[i].typeId;
            } else if (response.json().dataList[i].typeId == 0) {
              if (response.json().dataList[i].balance > 0) {
                this.balance0 = response.json().dataList[i].balance;
              } else {
                this.balance0 = 0;
              }
              this.type0 = response.json().dataList[i].type;
              this.typeId0 = response.json().dataList[i].typeId;
            } else if (response.json().dataList[i].typeId == 5) {
              if (response.json().dataList[i].balance > 0) {
                this.balance5 = response.json().dataList[i].balance;
              } else {
                this.balance5 = 0;
              }
              this.type5 = response.json().dataList[i].type;
              this.typeId5 = response.json().dataList[i].typeId;
            } else if (response.json().dataList[i].typeId == 6) {
              if (response.json().dataList[i].balance > 0) {
                this.balance6 = response.json().dataList[i].balance;
              } else {
                this.balance6 = 0;
              }
              this.type6 = response.json().dataList[i].type;
              this.typeId6 = response.json().dataList[i].typeId;
            }
          }

        }
      })
  }

  //支付类型
  payModel() {
    console.log(this.balance2)
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择支付类型',
      buttons: [
        {
          text: '余额： ' + (this.balance0 * 0.01 - this.balance5 * 0.01).toFixed(2),
          // role: 'destructive',
          handler: () => {
            if (this.balance0 > 0) {
              this.choose = '余额';
              this.mCardPayCount = (this.balance0 * 0.01 - this.balance5 * 0.01).toFixed(2);
              this.payModelCheck = true;
              this.mCardPayCheck = true;
              this.mPaymentType = 0;
              this.changesMcardValue();
            } else {
              this.mCardPayCheck = false;
              this.appGlobal.showToast("余额不足，请选择其他支付方式！");
            }
          }
        }, {
          text: '投资M卡： ' + (this.balance1 * 0.01 - this.balance6 * 0.01).toFixed(2),
          handler: () => {
            if (this.balance1 > 0) {
              this.choose = '投资M卡';
              this.mCardPayCount = (this.balance1 * 0.01 - this.balance6 * 0.01).toFixed(2);
              this.payModelCheck = true;
              this.mCardPayCheck = true;
              this.mPaymentType = 1;
              this.changesMcardValue();
            } else {
              this.mCardPayCheck = false;
              this.appGlobal.showToast("投资M卡余额不足，请选择其他支付方式！");
            }
          }
        }, {
          text: '投资积分： ' + this.balance2.toFixed(2),
          handler: () => {

            if (this.balance2 > 0) {
              this.choose = '投资积分';
              this.mCardPayCount = this.balance2.toFixed(2);
              this.payModelCheck = true;
              this.mCardPayCheck = true;
              this.mPaymentType = 2;
              this.changesMcardValue();
            } else {
              this.mCardPayCheck = false;
              this.appGlobal.showToast("投资积分不足，请选择其他支付方式！");
            }
          }
        }, {
          text: '消费M卡： ' + (this.balance3 * 0.01).toFixed(2),
          handler: () => {
            if (this.balance3 > 0) {
              this.choose = '消费M卡';
              this.mCardPayCount = (this.balance3 * 0.01).toFixed(2);
              this.payModelCheck = true;
              this.mCardPayCheck = true;
              this.mPaymentType = 3;
              this.changesMcardValue();
            } else {
              this.mCardPayCheck = false;
              this.appGlobal.showToast("消费M卡余额不足，请选择其他支付方式！");
            }
          }
        }, {
          text: '消费积分： ' + this.balance4.toFixed(2),
          handler: () => {
            if (this.balance4 > 0) {
              this.choose = '消费积分';
              this.mCardPayCount = this.balance4.toFixed(2);
              this.payModelCheck = true;
              this.mCardPayCheck = true;
              this.mPaymentType = 4;
              this.changesMcardValue();
            } else {
              this.mCardPayCheck = false;
              this.appGlobal.showToast("消费积分不足，请选择其他支付方式！");
            }
          }
        }
      ]
    });
    actionSheet.present();
  }

  //支付类型切换
  changesMcardValue() {
    if (this.mCardPayCheck == true) {
      if (Number(this.mCardPayCount) < Number(this.ordery)) {
        this.weChatPay = this.ordery - this.mCardPayCount;
        if (this.ordery - this.mCardPayCount > 0) {
          this.weChatPayCheck == true;
        } else {
          this.weChatPayCheck = false;
        }
      } else {
        this.weChatPayCheck = false;
      }
      if (this.mCardPayCount == 0) {
        // this.payModel();
      }
    } else {
      if (this.weChatPayCheck == true) {
        this.weChatPay = this.ordery;
      }
    }

  }
  //微信支付方式
  changesWeChatValue() {
    if (this.weChatPayCheck == true) {
      if (this.mCardPayCheck == true) {
        if (Number(this.mCardPayCount) < Number(this.ordery)) {
          this.weChatPay = this.ordery - this.mCardPayCount;
        } else {
          this.mCardPayCheck = false;
          this.weChatPay = this.ordery;
        }
      } else {
        this.weChatPay = this.ordery;
      }

    } else {
      this.weChatPay = 0;
    }
  }

  pass: any;
  passYes: boolean;
  pays: any;
  obj: any;
  orderNos: string;
  // 跳付款
  gouwu() {
    console.log(Variable.getInstance().distance < this.dsDistance * 1000)
    console.log(Variable.getInstance().distance)
    console.log(this.dsDistance * 1000)
    if (this.die == 1) {
      return;
    } else if (this.die == 0) {
      //防止多次点击
      if (Variable.getInstance().click_flag == false) {
        return;
      } else {
        Variable.getInstance().click_flag = false;
        setTimeout(() => {//一秒后又可以点击
          Variable.getInstance().click_flag = true;
        }, 3000);
      }
    }



    // 改 --> 弹出模态框--> 选择支付方式




    // 》》》》》》》》》》
    //判断是否可以提交订单
    if (this.mCardPayCheck == false) {
      if (this.weChatPayCheck == false) {
        this.appGlobal.showToast("请选择支付方式！");
        return;
      }
    } else {
      console.log(this.mCardPayCount)
      console.log(this.ordery)
      console.log(this.weChatPayCheck)
      if (Number(this.mCardPayCount) < Number(this.ordery)) {
        if (this.weChatPayCheck == false) {
          this.appGlobal.showToast("余额不足,请选择其他支付方式!");
          console.log(11111111111111111111111)
          return;
        }
      }
    }

    //《《《《《《《《《《《《《《《《《

    this.actid = this.params.get('actid');
    let itm = [];
    let Since;
    // let tokenId = localStorage.getItem('tokenId');
    var odBase = new Object();
    let odProduct = [];
    if (this.testRadioResult == '自提') {
        Since = 1;
    } 
    
    if (this.testRadioResult == '配送') {
        Since = 0;
    }

    if (this.actid) {
      var isUseActivity = 1
    } else {
      isUseActivity = 0
    }

    console.log(this.codeadd);
    
    if (this.codeadd == 200) {//收货地址
      if (Since == 1) {// 配送方式
        console.log(this.default);
        
        if (this.default) {//时间选择器
          let timeq = this.default.substr(0, 5) + ':00';
          let timeh = this.default.substr(6, 10) + ':00';

          if (this.isUseCoupon == 0) {//是否使用优惠券(0:不使用,1:已使用)
            if (this.Remarks) {//订单备注
              if (this.mCardPayCheck == false && this.weChatPayCheck == true) {
                odBase = {
                  shopid: Variable.getInstance().shopid, //商店ID
                  transportType: Since,//配送方式(0:配送,1:自提)
                  transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                  transportEndTime: this.now + ' ' + timeh,//配送结束时间
                  userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                  userName: this.username,//收货人名称
                  userMobile: this.mobileno,//收货人电话
                  isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                  orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                  receivable: this.ordery,//应收(订单总价-优惠券金额)
                  orderMessage: this.Remarks, //订单备注
                  payType: 1
                };
              } else if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
                odBase = {
                  shopid: Variable.getInstance().shopid, //商店ID
                  transportType: Since,//配送方式(0:配送,1:自提)
                  transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                  transportEndTime: this.now + ' ' + timeh,//配送结束时间
                  userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                  userName: this.username,//收货人名称
                  userMobile: this.mobileno,//收货人电话
                  isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                  orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                  receivable: this.ordery,//应收(订单总价-优惠券金额)
                  orderMessage: this.Remarks, //订单备注
                  payType: 2
                };
              } else if (this.mCardPayCheck == true && this.weChatPayCheck == true) {
                odBase = {
                  shopid: Variable.getInstance().shopid, //商店ID
                  transportType: Since,//配送方式(0:配送,1:自提)
                  transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                  transportEndTime: this.now + ' ' + timeh,//配送结束时间
                  userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                  userName: this.username,//收货人名称
                  userMobile: this.mobileno,//收货人电话
                  isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                  orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                  receivable: this.ordery,//应收(订单总价-优惠券金额)
                  orderMessage: this.Remarks, //订单备注
                  payType: 3
                };
              }

            } else {
              if (this.mCardPayCheck == false && this.weChatPayCheck == true) {
                odBase = {
                  shopid: Variable.getInstance().shopid, //商店ID
                  transportType: Since,//配送方式(0:配送,1:自提)
                  transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                  transportEndTime: this.now + ' ' + timeh,//配送结束时间
                  userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                  userName: this.username,//收货人名称
                  userMobile: this.mobileno,//收货人电话
                  isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                  orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                  receivable: this.ordery,//应收(订单总价-优惠券金额)
                  payType: 1 //支付状态
                };
              } else if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
                odBase = {
                  shopid: Variable.getInstance().shopid, //商店ID
                  transportType: Since,//配送方式(0:配送,1:自提)
                  transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                  transportEndTime: this.now + ' ' + timeh,//配送结束时间
                  userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                  userName: this.username,//收货人名称
                  userMobile: this.mobileno,//收货人电话
                  isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                  orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                  receivable: this.ordery,//应收(订单总价-优惠券金额)
                  payType: 2 //支付状态
                };
              } else if (this.mCardPayCheck == true && this.weChatPayCheck == true) {
                odBase = {
                  shopid: Variable.getInstance().shopid, //商店ID
                  transportType: Since,//配送方式(0:配送,1:自提)
                  transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                  transportEndTime: this.now + ' ' + timeh,//配送结束时间
                  userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                  userName: this.username,//收货人名称
                  userMobile: this.mobileno,//收货人电话
                  isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                  orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                  receivable: this.ordery,//应收(订单总价-优惠券金额)
                  payType: 3 //支付状态
                };
              }

            }
          } else if (this.isUseCoupon == 1) {
            if (this.orderz >= this.threshold && this.start <= this.day && this.end >= this.day) {
              if (this.Remarks) {//订单备注
                if (this.mCardPayCheck == false && this.weChatPayCheck == true) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                    couponId: this.couponActivityId, //优惠券ID
                    couponMsPassRelationId: this.id,//优惠券关联ID
                    usedCouponAmount: this.amount,//优惠券金额
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    orderMessage: this.Remarks,//订单备注
                    payType: 1 //支付状态
                  };
                } else if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                    couponId: this.couponActivityId, //优惠券ID
                    couponMsPassRelationId: this.id,//优惠券关联ID
                    usedCouponAmount: this.amount,//优惠券金额
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    orderMessage: this.Remarks,//订单备注
                    payType: 2 //支付状态
                  };
                } else if (this.mCardPayCheck == true && this.weChatPayCheck == true) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                    couponId: this.couponActivityId, //优惠券ID
                    couponMsPassRelationId: this.id,//优惠券关联ID
                    usedCouponAmount: this.amount,//优惠券金额
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    orderMessage: this.Remarks,//订单备注
                    payType: 3 //支付状态
                  };
                }

              } else {
                if (this.mCardPayCheck == false && this.weChatPayCheck == true) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                    transportEndTime: this.now + ' ' + timeh,//配送结束时间
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                    couponId: this.couponActivityId, //优惠券ID
                    couponMsPassRelationId: this.id,//优惠券关联ID
                    usedCouponAmount: this.amount,//优惠券金额
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    payType: 1 //支付状态
                  };
                } else if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                    transportEndTime: this.now + ' ' + timeh,//配送结束时间
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                    couponId: this.couponActivityId, //优惠券ID
                    couponMsPassRelationId: this.id,//优惠券关联ID
                    usedCouponAmount: this.amount,//优惠券金额
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    payType: 2 //支付状态
                  };
                } else if (this.mCardPayCheck == true && this.weChatPayCheck == true) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                    transportEndTime: this.now + ' ' + timeh,//配送结束时间
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                    couponId: this.couponActivityId, //优惠券ID
                    couponMsPassRelationId: this.id,//优惠券关联ID
                    usedCouponAmount: this.amount,//优惠券金额
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    payType: 3 //支付状态
                  };
                }

              }
            } else {
              this.appGlobal.showToast('您使用优惠劵的条件没有达到')
              return;
            }
          }
        } else {
          this.appGlobal.showToast("请选择配送时间")
          return;
        }
        console.log(Since);
        
      }else if (Since == 0) {// 配送方式
        if (this.default) {//时间选择器
          let timeq = this.default.substr(0, 5) + ':00';
          let timeh = this.default.substr(6, 10) + ':00';
          if (Variable.getInstance().distance < this.dsDistance * 1000) {
            if (this.isUseCoupon == 0) {

              if (this.Remarks) {//订单备注
                if (this.mCardPayCheck == false && this.weChatPayCheck == true) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                    transportEndTime: this.now + ' ' + timeh,//配送结束时间
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    orderMessage: this.Remarks,//订单备注
                    payType: 1 //支付状态
                  };
                } else if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                    transportEndTime: this.now + ' ' + timeh,//配送结束时间
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    orderMessage: this.Remarks,//订单备注
                    payType: 2 //支付状态
                  };
                } else if (this.mCardPayCheck == true && this.weChatPayCheck == true) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                    transportEndTime: this.now + ' ' + timeh,//配送结束时间
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    orderMessage: this.Remarks,//订单备注
                    payType: 3 //支付状态
                  };
                }

              } else {
                if (this.mCardPayCheck == false && this.weChatPayCheck == true) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                    transportEndTime: this.now + ' ' + timeh,//配送结束时间
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    payType: 3 //支付状态
                  };
                } else if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                    transportEndTime: this.now + ' ' + timeh,//配送结束时间
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    payType: 2 //支付状态
                  };
                } else if (this.mCardPayCheck == true && this.weChatPayCheck == true) {
                  odBase = {
                    shopid: Variable.getInstance().shopid, //商店ID
                    transportType: Since,//配送方式(0:配送,1:自提)
                    transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                    transportEndTime: this.now + ' ' + timeh,//配送结束时间
                    userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                    userName: this.username,//收货人名称
                    userMobile: this.mobileno,//收货人电话
                    isUseCoupon: 0, //是否使用优惠券(0:不使用,1:已使用)
                    orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                    receivable: this.ordery,//应收(订单总价-优惠券金额)
                    payType: 3 //支付状态
                  };
                }

              }
            } else if (this.isUseCoupon == 1) {
              if (this.orderz >= this.threshold && this.start <= this.day && this.end >= this.day) {
                if (this.Remarks) {//订单备注
                  if (this.mCardPayCheck == false && this.weChatPayCheck == true) {
                    odBase = {
                      shopid: Variable.getInstance().shopid, //商店ID
                      transportType: Since,//配送方式(0:配送,1:自提)
                      transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                      transportEndTime: this.now + ' ' + timeh,//配送结束时间
                      userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                      userName: this.username,//收货人名称
                      userMobile: this.mobileno,//收货人电话
                      isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                      couponId: this.couponActivityId, //优惠券ID
                      couponMsPassRelationId: this.id,//优惠券关联ID
                      usedCouponAmount: this.amount,//优惠券金额
                      orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                      receivable: this.ordery,//应收(订单总价-优惠券金额)
                      orderMessage: this.Remarks,//订单备注
                      payType: 1 //支付状态
                    };
                  } else if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
                    odBase = {
                      shopid: Variable.getInstance().shopid, //商店ID
                      transportType: Since,//配送方式(0:配送,1:自提)
                      transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                      transportEndTime: this.now + ' ' + timeh,//配送结束时间
                      userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                      userName: this.username,//收货人名称
                      userMobile: this.mobileno,//收货人电话
                      isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                      couponId: this.couponActivityId, //优惠券ID
                      couponMsPassRelationId: this.id,//优惠券关联ID
                      usedCouponAmount: this.amount,//优惠券金额
                      orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                      receivable: this.ordery,//应收(订单总价-优惠券金额)
                      orderMessage: this.Remarks,//订单备注
                      payType: 2 //支付状态
                    };
                  } else if (this.mCardPayCheck == true && this.weChatPayCheck == true) {
                    odBase = {
                      shopid: Variable.getInstance().shopid, //商店ID
                      transportType: Since,//配送方式(0:配送,1:自提)
                      transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                      transportEndTime: this.now + ' ' + timeh,//配送结束时间
                      userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                      userName: this.username,//收货人名称
                      userMobile: this.mobileno,//收货人电话
                      isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                      couponId: this.couponActivityId, //优惠券ID
                      couponMsPassRelationId: this.id,//优惠券关联ID
                      usedCouponAmount: this.amount,//优惠券金额
                      orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                      receivable: this.ordery,//应收(订单总价-优惠券金额)
                      orderMessage: this.Remarks,//订单备注
                      payType: 3 //支付状态
                    };
                  }

                } else {
                  if (this.mCardPayCheck == false && this.weChatPayCheck == true) {
                    odBase = {
                      shopid: Variable.getInstance().shopid, //商店ID
                      transportType: Since,//配送方式(0:配送,1:自提)
                      transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                      transportEndTime: this.now + ' ' + timeh,//配送结束时间
                      userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                      userName: this.username,//收货人名称
                      userMobile: this.mobileno,//收货人电话
                      isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                      couponId: this.couponActivityId, //优惠券ID
                      couponMsPassRelationId: this.id,//优惠券关联ID
                      usedCouponAmount: this.amount,//优惠券金额
                      orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                      receivable: this.ordery,//应收(订单总价-优惠券金额)
                      payType: 1 //支付状态
                    };
                  } else if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
                    odBase = {
                      shopid: Variable.getInstance().shopid, //商店ID
                      transportType: Since,//配送方式(0:配送,1:自提)
                      transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                      transportEndTime: this.now + ' ' + timeh,//配送结束时间
                      userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                      userName: this.username,//收货人名称
                      userMobile: this.mobileno,//收货人电话
                      isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                      couponId: this.couponActivityId, //优惠券ID
                      couponMsPassRelationId: this.id,//优惠券关联ID
                      usedCouponAmount: this.amount,//优惠券金额
                      orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                      receivable: this.ordery,//应收(订单总价-优惠券金额)
                      payType: 2 //支付状态
                    };
                  } else if (this.mCardPayCheck == true && this.weChatPayCheck == true) {
                    odBase = {
                      shopid: Variable.getInstance().shopid, //商店ID
                      transportType: Since,//配送方式(0:配送,1:自提)
                      transportStartTime: this.now + ' ' + timeq,//配送开始时间:(yyyy-MM-dd HH:mm:ss)
                      transportEndTime: this.now + ' ' + timeh,//配送结束时间
                      userAddress: this.provinceName + this.cityName + this.countyName + this.addressDetail,//收货人地址
                      userName: this.username,//收货人名称
                      userMobile: this.mobileno,//收货人电话
                      isUseCoupon: 1, //是否使用优惠券(0:不使用,1:已使用)
                      couponId: this.couponActivityId, //优惠券ID
                      couponMsPassRelationId: this.id,//优惠券关联ID
                      usedCouponAmount: this.amount,//优惠券金额
                      orderTotalprice: this.orderz,//订单总价(所有商品单价*数量的和)
                      receivable: this.ordery,//应收(订单总价-优惠券金额)
                      payType: 3 //支付状态
                    };
                  }

                }
              } else {
                this.appGlobal.showToast('您使用优惠劵的条件没有达到')
                return;
              }

            }
          } else {
            this.appGlobal.showToast("您当前的位置不在配送范围内")
            return;
          }
        } else {
          this.appGlobal.showToast("请选择配送时间")
          return;
        }
      } else {
        this.appGlobal.showToast("请选择配送方式")
        return;
      }

    } else {
      this.appGlobal.showToast("请填写收货地址")
      return;
    }

    for (let i = 0; i < this.carPile.length; i++) {
      if (this.carPile[i].ids != null && this.carPile[i].ids != undefined) {
        if (this.carPile[i].isUseActivity == 0) {
          odProduct.push({
            itemid: this.carPile[i].ids,//商品ID
            productName: this.carPile[i].name,//商品名称
            productTitle: this.carPile[i].title,//商品标题
            productQty: this.carPile[i].num,//商品数量
            salePrice: this.carPile[i].sprice,//商品单价
            productTotleprice: this.carPile[i].sprice * this.carPile[i].num, //商品总价
            shopid: Variable.getInstance().shopid, //商家ID
            isUseActivity: 0//是否是活动价(0:否,1:是)
          })
          itm.push(this.carPile[i].ids)
        } else if (this.carPile[i].isUseActivity == 1) {
          odProduct.push({
            itemid: this.carPile[i].ids,//商品ID
            productName: this.carPile[i].name,//商品名称
            productTitle: this.carPile[i].title,//商品标题
            productQty: this.carPile[i].num,//商品数量
            salePrice: this.carPile[i].sprice,//商品单价
            productTotleprice: this.carPile[i].sprice * this.carPile[i].num, //商品总价
            shopid: Variable.getInstance().shopid,//商家ID
            isUseActivity: 1,//是否是活动价(0:否,1:是)
            shopActivityId: this.carPile[i].act //活动ID
          })
          itm.push(this.carPile[i].ids)
        }
        else {
          odProduct.push({
            itemid: this.carPile[i].ids,//商品ID
            productName: this.carPile[i].name,//商品名称
            productTitle: this.carPile[i].title,//商品标题
            productQty: this.carPile[i].num,//商品数量
            salePrice: this.carPile[i].sprice,//商品单价
            productTotleprice: this.carPile[i].sprice * this.carPile[i].num, //商品总价
            shopid: Variable.getInstance().shopid, //商家ID
            isUseActivity: 0//是否是活动价(0:否,1:是)
          })
          itm.push(this.carPile[i].ids)
        }
      } else {
        this.appGlobal.showToast("订单缺少ITEMID")
        return;
      }

    }


    ///支付20180314
    // 判断进入支付页面
    // console.log(this.passYes)
    // console.log(this.pass)
    let modal = this.modalCtrl.create(OrderpaypwdPage, { passYes: this.passYes, pass: this.pass });
    modal.present();
    modal.onDidDismiss(data => {
      console.log(data);
      
      this.passYes = data.passYes;
      this.pass = data.pass;
      // console.log(data.pass, 'md5')
      if (!this.passYes) {
        return;
      } else {
        //M卡支付
        if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
          // 订单提交
          let aa = { tokenId: this.tokenId, odBase: odBase, odProductList: odProduct, userAgent: this.userAgent }
          console.log(aa);
          
          this.http.post(AppConfig.getDebugUrl + '/api/shop/order/submitOrder', { tokenId: this.tokenId, odBase: odBase, odProductList: odProduct, userAgent: this.userAgent })
            .toPromise()
            .then(response => {
              console.log(response);
              if (response.json().code == 200) {
                this.orderNos = response.json().orderNo;
              } else {
                this.appGlobal.showToast("订单提交失败：" + response.json().msg)
                return;
              }

              //预支付信息生成
              this.ajax.get(AppConfig.getDebugUrl + '/api/shop/lmcard/generatePayment', { orderno: this.orderNos, amount: this.orderz })
                .toPromise()
                .then(response => {
                  console.log(response);
                  
                  let prepayNo = response.json().data.prepayNo;
                  let appId = response.json().data.appId;
                  let merchantId = response.json().data.merchantId;
                  let publicKey = response.json().data.publicKey;
                  let sign = response.json().data.sign;
                  let systemTime = response.json().systemTime;

                  let encrypt = new JSEncrypt()
                  encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----')
                  this.obj = {
                    'userToken': this.userToken,
                    'userCode': this.userCodes,
                    'userAgent': this.userAgent,
                    'paymentPassword': this.pass,
                    'paymentType': this.mPaymentType,
                    'prepayNo': prepayNo,
                    'timestamp': systemTime
                  }
                  console.log(this.obj );
                  
                  let eat = JSON.stringify(this.obj)
                  // console.log(eat)
                  let rsajm = encrypt.encryptLong(eat)
                  console.log(rsajm)
                  //预支付信息生成
                  this.ajax.get(AppConfig.getDebugUrl + '/api/shop/lmcard/confirmPay', { prepayNo: prepayNo, timestamp: systemTime, userPayInfo: rsajm })
                    .toPromise()
                    .then(response => {
                      console.log(response);
                      if (response.json().resultCode == 200) {
                        this.navCtrl.push(OrderFulfillment, { orderno: this.orderNos, paymentType: 1 }).then(() => {

                          this.navCtrl.remove(1, this.navCtrl.length() - 2, null);
                          //支付完成后删除当前商品
                          let san = itm.join(",");
                          this.ajax.post(AppConfig.getDebugUrl + '/api/shop/shopcar/odShopcarDetail/deleteByItem', { tokenid: this.tokenId, shopid: Variable.getInstance().shopid, itemids: san, userAgent: this.userAgent })
                            .toPromise()
                            .then(response => {
                              response.json().data;
                            })
                        }, () => { });
                        this.die = 1;
                      } else {
                        this.appGlobal.showToast(response.json().resultMsg);
                      }
                    })

                })
            })
        }
        // 其他方式支付
        else{

        }
      }
    });
    
    // //第三方支付
    // if (this.mCardPayCheck == false && this.weChatPayCheck == true) {
    //   // // 订单提交
    //   // this.http.post(AppConfig.getDebugUrl + '/api/shop/order/submitOrder', { tokenId: this.tokenId, odBase: odBase, odProductList: odProduct,userAgent: this.userAgent })
    //   //   .toPromise()
    //   //   .then(response => {
    //   //     if (response.json().code == 200) {
    //   //       this.orderNos = response.json().orderNo;
    //   //     } else {
    //   //       this.appGlobal.showToast("订单提交失败：" + response.json().msg)
    //   //       return;
    //   //     }
    //   //     // 微信生成预支付订单
    //   //     this.ajax.get(AppConfig.getDebugUrl + '/api/shop/lmcard/lmAuthWxPayGeneratePayment', { orderno: this.orderNos })
    //   //       .toPromise()
    //   //       .then(response => {
    //   //         this.pays = {
    //   //           partnerid: response.json().data.partnerid, // merchant id 商户id
    //   //           prepayid: response.json().data.prepayid, // prepay id 预付id
    //   //           noncestr: response.json().data.noncestr, // nonce 随机字符串
    //   //           timestamp: response.json().data.timestamp, // timestamp 时间戳
    //   //           sign: response.json().data.sign, // signed string 签名
    //   //         };
    //   //         window.parent.postMessage(this.pays, "*");

    //   //         this.QueryOrder()
    //   //         this.die = 1;
    //   //         //支付完成后删除当前商品
    //   //         let san = itm.join(",");
    //   //         this.ajax.post(AppConfig.getDebugUrl + '/api/shop/shopcar/odShopcarDetail/deleteByItem', { tokenid: this.tokenId, shopid: Variable.getInstance().shopid, itemids: san,userAgent: this.userAgent })
    //   //           .toPromise()
    //   //           .then(response => {
    //   //             response.json().data;
    //   //           })
    //   //       })
    //   //   })
    // } else {
    //   // 判断进入支付页面
    //   let modal = this.modalCtrl.create(OrderpaypwdPage, { passYes: this.passYes, pass: this.pass });
    //   modal.present();
    //   modal.onDidDismiss(data => {
    //     this.passYes = data.passYes;
    //     this.pass = data.pass;
    //     // console.log(data.pass, 'md5')
    //     if (!this.passYes) {
    //       return;
    //     } else {
    //       //M卡支付
    //       if (this.mCardPayCheck == true && this.weChatPayCheck == false) {
    //         // 订单提交
    //         this.http.post(AppConfig.getDebugUrl + '/api/shop/order/submitOrder', { tokenId: this.tokenId, odBase: odBase, odProductList: odProduct,userAgent: this.userAgent })
    //           .toPromise()
    //           .then(response => {
    //             if (response.json().code == 200) {
    //               this.orderNos = response.json().orderNo;
    //             } else {
    //               this.appGlobal.showToast("订单提交失败：" + response.json().msg)
    //               return;
    //             }

    //             //预支付信息生成
    //             this.ajax.get(AppConfig.getDebugUrl + '/api/shop/lmcard/generatePayment', { orderno: this.orderNos, amount: this.orderz })
    //               .toPromise()
    //               .then(response => {
    //                 let prepayNo = response.json().data.prepayNo;
    //                 let appId = response.json().data.appId;
    //                 let merchantId = response.json().data.merchantId;
    //                 let publicKey = response.json().data.publicKey;
    //                 let sign = response.json().data.sign;
    //                 let systemTime = response.json().systemTime;

    //                 let encrypt = new JSEncrypt()
    //                 encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----')
    //                 this.obj = {
    //                   'userToken': this.userToken,
    //                   'userCode': this.userCodes,
    //                   'userAgent': this.userAgent,
    //                   'paymentPassword': this.pass,
    //                   'paymentType': this.mPaymentType,
    //                   'prepayNo': prepayNo,
    //                   'timestamp': systemTime
    //                 }
    //                 let eat = JSON.stringify(this.obj)
    //                 // console.log(eat)
    //                 let rsajm = encrypt.encryptLong(eat)
    //                 // console.log(rsajm, 'rsa')
    //                 //预支付信息生成
    //                 this.ajax.get(AppConfig.getDebugUrl + '/api/shop/lmcard/confirmPay', { prepayNo: prepayNo, timestamp: systemTime, userPayInfo: rsajm })
    //                   .toPromise()
    //                   .then(response => {
    //                     if (response.json().resultCode == 200) {
    //                       this.navCtrl.push(OrderFulfillment, { orderno: this.orderNos, paymentType: 1 }).then(() => {

    //                         this.navCtrl.remove(1, this.navCtrl.length() - 2, null);
    //                         //支付完成后删除当前商品
    //                         let san = itm.join(",");
    //                         this.ajax.post(AppConfig.getDebugUrl + '/api/shop/shopcar/odShopcarDetail/deleteByItem', { tokenid: this.tokenId, shopid: Variable.getInstance().shopid, itemids: san,userAgent: this.userAgent })
    //                           .toPromise()
    //                           .then(response => {
    //                             response.json().data;
    //                           })
    //                       }, () => { });
    //                       this.die = 1;
    //                     } else {
    //                       this.appGlobal.showToast(response.json().resultMsg);
    //                     }
    //                   })

    //               })
    //           })
    //       }

    //       // //混合支付
    //       // if (this.mCardPayCheck == true && this.weChatPayCheck == true) {
    //       //   // 订单提交
    //       //   this.http.post(AppConfig.getDebugUrl + '/api/shop/order/submitOrder', { tokenId: this.tokenId, odBase: odBase, odProductList: odProduct,userAgent: this.userAgent })
    //       //     .toPromise()
    //       //     .then(response => {
    //       //       if (response.json().code == 200) {
    //       //         this.orderNos = response.json().orderNo;
    //       //       } else {
    //       //         this.appGlobal.showToast("订单提交失败：" + response.json().msg)
    //       //         return;
    //       //       }
    //       //       //预支付信息生成
    //       //       this.ajax.get(AppConfig.getDebugUrl + '/api/shop/lmcard/generatePayment', { orderno: this.orderNos, amount: this.mCardPayCount })
    //       //         .toPromise()
    //       //         .then(response => {
    //       //           let prepayNo = response.json().data.prepayNo;
    //       //           let appId = response.json().data.appId;
    //       //           let merchantId = response.json().data.merchantId;
    //       //           let publicKey = response.json().data.publicKey;
    //       //           let sign = response.json().data.sign;
    //       //           let systemTime = response.json().systemTime;

    //       //           let encrypt = new JSEncrypt()
    //       //           encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----')
    //       //           this.obj = {
    //       //             'userToken': this.userToken,
    //       //             'userCode': this.userCodes,
    //       //             'userAgent': this.userAgent,
    //       //             'paymentPassword': this.pass,
    //       //             'paymentType': this.mPaymentType,
    //       //             'prepayNo': prepayNo,
    //       //             'timestamp': systemTime
    //       //           }
    //       //           let eat = JSON.stringify(this.obj)
    //       //           let rsajm = encrypt.encryptLong(eat)
    //       //           //预支付信息生成
    //       //           this.ajax.get(AppConfig.getDebugUrl + '/api/shop/lmcard/confirmPay', { prepayNo: prepayNo, timestamp: systemTime, userPayInfo: rsajm })
    //       //             .toPromise()
    //       //             .then(response => {
    //       //               if (response.json().resultCode == 200) {
    //       //                 this.ajax.get(AppConfig.getDebugUrl + '/api/shop/lmcard/lmAuthWxPayGeneratePayment', { orderno: this.orderNos })
    //       //                   .toPromise()
    //       //                   .then(response => {
    //       //                     this.pays = {
    //       //                       partnerid: response.json().data.partnerid, // merchant id 商户id
    //       //                       prepayid: response.json().data.prepayid, // prepay id 预付id
    //       //                       noncestr: response.json().data.noncestr, // nonce 随机字符串
    //       //                       timestamp: response.json().data.timestamp, // timestamp 时间戳
    //       //                       sign: response.json().data.sign, // signed string 签名
    //       //                     };
    //       //                     window.parent.postMessage(this.pays, "*");
    //       //                     this.QueryOrder()
    //       //                     this.die = 1;
    //       //                     //支付完成后删除当前商品
    //       //                     let san = itm.join(",");
    //       //                     this.ajax.post(AppConfig.getDebugUrl + '/api/shop/shopcar/odShopcarDetail/deleteByItem', { tokenid: this.tokenId, shopid: Variable.getInstance().shopid, itemids: san,userAgent: this.userAgent })
    //       //                       .toPromise()
    //       //                       .then(response => {
    //       //                         response.json().data;
    //       //                       })
    //       //                   })
    //       //               } else {
    //       //                 this.appGlobal.showToast(response.json().resultMsg);
    //       //               }
    //       //             })

    //       //         })

    //       //     })
    //       // }

    //     }
    //   });
    // }


  }
  QueryOrder() {//触发微信支付返回状态
    window.addEventListener('message', (e) => {
      var color = e.data;
      if (e != null && e != undefined) {
        if (color.code == 200) {
          this.navCtrl.push(OrderFulfillment, { orderno: this.orderNos, paymentType: 1 }).then(() => {
            this.navCtrl.remove(1, this.navCtrl.length() - 2, null);
          }, () => { });
        }
      }
    }, false);
  }


  /**
 * 跳转到支付页面
 */
  gotoPay() {
    let params = {
      dataList:this.dataList,   //查询我的余额
      carGoodsIdNum: this.carGoodsIdNum,//存放购物车商品数量和ID
      carPile: this.carPile,//存放购物车
      amount: this.amount,// 优惠卷
      codeadd: this.codeadd,// 获取默认状态码
      username: this.username,// 用户名
      mobileno: this.mobileno, // 手机号
      pitmes: this.pitmes, // 商品清单数据
      shopName: this.shopName, // 清单店铺
      len: this.len, // 商品数量
      orderz: this.orderz, // 订单总价
      ordery: this.ordery, // 应收
      orderNo: this.orderNo, // 订单号
      money: this.orderz,
      checkedID: this.checkedID,
      balance5: this.balance5,//冻结金额
      balance6: this.balance6,//冻结高额M卡
      coupText: this.coupText//优惠文字

    }
    let profileModal = this.modalCtrl.create(PayboxPage, { param: params});
   
    profileModal.present();

    //选择支付方式回调
      //M卡支付类型(0:余额、1:投资M卡、2:消费M卡、3:投资M卡积分、4:消费M卡积分;高M卡余额=投资M卡，低M卡余额=消费M卡，高M卡积分=投资M卡积分，低M卡积分=消费M卡积分)
    
    profileModal.onDidDismiss(data => {
      if (data.payname) {
        console.log(data)
        this.choose = data.payname
        this.mCardPayCheck = true;
        this.checkedID = data.checkedID;
        this.mCardPayCount = data.balance
        switch (data.payname) {
          case '账户余额':
            this.balance0 = data.balance*0.01;
            this.mPaymentType = 0
            this.ordery = this.orderz;
            break;

          case '投资M卡':
            this.balance1 = data.balance * 0.01
            this.mPaymentType = 1
            if (this.zhekou!=0) {
              this.ordery = Math.round(Number(this.orderz) * Number(this.zhekou) * 100) / 100;
            }
            
            break;

          case '投资积分':
            this.balance2 = data.balance
            this.mPaymentType = 3
            this.ordery = this.orderz;
            break;

          case '消费M卡':
            this.balance3 = data.balance * 0.01
            this.mPaymentType = 2
            if (this.zhekou != 0) {
              this.ordery = Math.round(Number(this.orderz) * Number(this.zhekou)*100)/100 ;
            }

            break;

          case '消费积分':
            this.balance4 = data.balance
            this.mPaymentType = 4
            this.ordery = this.orderz;
            break;
        
          default:
            break;
        }

      }else{

      }
     
    });
  }


  //店铺分类是否享受折扣-判断
  shopkind(){
    let itm = [];
    let odProduct = [];
    console.log(this.params.get('carPile'))
    console.log(this.carPile)
    for (let i = 0; i < this.carPile.length; i++) {
      if (this.carPile[i].ids != null && this.carPile[i].ids != undefined) {
        if (this.carPile[i].isUseActivity == 0) {
          odProduct.push({
            itemid: this.carPile[i].ids,//商品ID
            productName: this.carPile[i].name,//商品名称
            productTitle: this.carPile[i].title,//商品标题
            productQty: this.carPile[i].num,//商品数量
            salePrice: this.carPile[i].sprice,//商品单价
            productTotleprice: this.carPile[i].sprice * this.carPile[i].num, //商品总价
            shopid: Variable.getInstance().shopid, //商家ID
            isUseActivity: 0//是否是活动价(0:否,1:是)
          })
          itm.push(this.carPile[i].id)
        } else if (this.carPile[i].isUseActivity == 1) {
          odProduct.push({
            itemid: this.carPile[i].ids,//商品ID
            productName: this.carPile[i].name,//商品名称
            productTitle: this.carPile[i].title,//商品标题
            productQty: this.carPile[i].num,//商品数量
            salePrice: this.carPile[i].sprice,//商品单价
            productTotleprice: this.carPile[i].sprice * this.carPile[i].num, //商品总价
            shopid: Variable.getInstance().shopid,//商家ID
            isUseActivity: 1,//是否是活动价(0:否,1:是)
            shopActivityId: this.carPile[i].act //活动ID
          })
          itm.push(this.carPile[i].ids)
        }
        else {
          odProduct.push({
            itemid: this.carPile[i].ids,//商品ID
            productName: this.carPile[i].name,//商品名称
            productTitle: this.carPile[i].title,//商品标题
            productQty: this.carPile[i].num,//商品数量
            salePrice: this.carPile[i].sprice,//商品单价
            productTotleprice: this.carPile[i].sprice * this.carPile[i].num, //商品总价
            shopid: Variable.getInstance().shopid, //商家ID
            isUseActivity: 0//是否是活动价(0:否,1:是)
          })
          itm.push(this.carPile[i].ids)
        }
      } else {
        this.appGlobal.showToast("订单缺少ITEMID")
        return;
      }

    }
    console.log(itm)
    let sitm:string = itm.toString();
    // sitm.substring(1)
    // console.log(sitm);
    // console.log(sitm.substring(1));
    let params ={
      productIds: itm.toString(),
      shopId: Variable.getInstance().shopid,
    }
    console.log(params)
    this.ajax.get(AppConfig.getDebugUrl + '/api/shop/product/prodProduct/isDiscounts', params)
    .map(r=>r.json())
    .subscribe(r=>{
      console.log(r)
      if (r.code==200) {
        this.ajax.get(AppConfig.getDebugUrl + '/api/shop/shopActivity/activity/getDiscountRatio', { shopId: Variable.getInstance().shopid})
        .map(d=>d.json())
        .subscribe(d=>{
          console.log(d)
          this.coupText = 'M卡支付享受'+d.data*100+'折'
          this.zhekou = d.data;
        })
      }else{
        this.coupText = r.message;
      }
    }

    )
  }

}

 