import { AppGlobal } from './../../AppGlobal';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PayboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paybox',
  templateUrl: 'paybox.html',
})
export class PayboxPage {
  // @ViewChild('#radio1') radio1
  // @ViewChild('#radio2') radio2
  // @ViewChild('#radio3') radio3
  // @ViewChild('input') radio4
  // @ViewChild('radio5') radio5
  public payMoney //支付金额
  public payf1    //消费M卡
  public payf2    //消费积分
  public payf3    //投资M卡
  public payf4    //投资积分
  public     //账户余额
  public payye1 = 0   //消费M卡余额
  public payye2 = 0    //消费积分余额
  public payye3 = 0    //投资M卡余额
  public payye4 = 0    //投资积分余额
  public payye5 = 0    //账户余额余额
  public payName  //支付方式
  public checkedID;
  public coupText;//优惠文字

  constructor(public appGlobal:AppGlobal,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public params: NavParams) {
    console.log(params.get('param'));
    let data = params.get('param')
    this.checkedID = data.checkedID;
    this.Balance(data.dataList)
    // console.log(this.radio4)
    // console.log(this.aaa)
    this.coupText = data.coupText;

    console.log(this.payye5);
    
  }

  ionViewDidLoad() {
    
  }
   

  /**
   * radio选中事件
   * @param e :$event
   * @param payname :支付方式
   */
  radioChange(e, payname, balance) {
    console.log(e);
    console.log(payname);
    switch (payname) {
      case 1:
        this.payName = "消费M卡"
        break;

      case 2:
        this.payName = "消费积分"
        break;

      case 3:
        this.payName = "投资M卡"
        break;

      case 4:
        this.payName = "投资积分"
        break;

      case 5:
        this.payName = "账户余额"
        break;

      default:
        break;
    }
    this.checkedID = payname
    let dataParam = { //回调参数
      payname: this.payName,
      checkedID: this.checkedID,
      balance: balance,
    };
    this.viewCtrl.dismiss(dataParam);
    
  }

  /** 
   * 关闭模态框
   * 
   */
  closewin() {
     let all = [].slice.call(document.querySelectorAll("input"));
    let inputTrue = all.filter((tiem: any) => tiem.checked)
    console.log(inputTrue);
    if (inputTrue.length!=0) {
      let dataParam = { //回调参数
        payname: this.payName,
        checkedID: this.checkedID,
        balance: inputTrue[0].value
      };
      this.viewCtrl.dismiss(dataParam);
    }else{
      this.appGlobal.showToast("请选择支付方式!");
    }
     

  }


  Balance(data) {
    this.payye1 = this.pd(data[0].balance)  //消费M卡余额
    this.payye2 = this.pd(data[1].balance)   //消费积分余额
    this.payye3 = this.pd(Number(data[2].balance) - Number(data[6].balance))   //投资M卡余额
    this.payye4 = this.pd(data[3].balance)    //投资积分余额
    this.payye5 = this.pd(Number(data[4].balance) - Number(data[5].balance))    //账户余额余额
  }

  
  pd(e) {
    if (e < 0) {
      return e = 0
    }else{
      return e
    }
  }
}
