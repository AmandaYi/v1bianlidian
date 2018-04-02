﻿export class Variable {//存放所有全局变量
    private static instance: Variable = new Variable();
    public static getInstance(): Variable {
        return Variable.instance;
    }
    constructor() {
        if (Variable.instance) {
            throw new Error("error use getInstance().");
        } else {
            Variable.instance = this;
        }
    }


    // 商品id
    public shopid: string = '9999001';

    // public shopid = () => {
    //     // // 云图数据范围检索的
    //     // let Cloud = JSON.parse(localStorage.getItem('Cloud'));
    //     // let CloudInf = Cloud.datas;
    //     // // 云图数据所有的不包含距离
    //     // let mess = JSON.parse(localStorage.getItem('mess'));
    //     // let StoreInf = mess.datas;
    //     // console.log(StoreInf)
    //     // console.log(CloudInf)
    //     // // 省份
    //     // let districtList = JSON.parse(sessionStorage.getItem('districtList'));
    //     // let districtL = districtList.districtList;
    //     // //城市
    //     // let Locationcity = Variable.getInstance().Locationcity
    //     // //定位到的城市
    //     // let formattedAddress = localStorage.getItem('formattedAddress')
    //     return '9999001'
    // }
    // 商品信息ID
    public itemid: any = [];
    // 商品信息数量
    public quantity: number[] = [];
    // 商品价格
    public sprice: any = [];
    // 商品标题
    public ctitle: any = [];
    // 商品名称
    public name: any = [];
    //用户通行ID
    public tokenid: string;
    //用户信息ID
    public userid: string;
    //用户登录ID
    public passId: string;
    //订单收货地址
    public BookingAddress: any = {};
    // 默认地址切换
    public adds: number = 1;
    //微信返回信息
    public wxInfo: any = {};
    //防止反复点击全局变量
    public click_flag: boolean = true;
    //头像地址
    public headimgurl: any;
    //订单详情
    public orderDetail: any = {};
    // 首页数量
    public tSum: number = 0;
    //优惠卷的使用
    public couponAct: any = [];
    //全局地址
    public Wholly: string;
    //市
    public cit: string;
    //距离
    public distance: number;
    //定位信息
    public formattedAddress: string = '';
    //定位城市
    public Locationcity: string;
    //店铺城市
    public _city: string = '';
    //全局访问
    public Visit: boolean = true;
    //判断ios
    public isIos: boolean;
    //最近
    public Lately: number = 0;


    public tokenId: string;
    public userCode: string;
}
