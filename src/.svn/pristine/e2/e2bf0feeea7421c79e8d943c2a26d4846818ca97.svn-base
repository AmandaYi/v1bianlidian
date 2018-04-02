
declare var Wechat: any;  // 此处声明plugin.xml中clobbers对应的值  


export interface WechatPayParam {
  partnerid: string;   // merchant id商品
  prepayid: string;   // prepay id支付
  noncestr: string;   // nonce 生成随机数算法
  timestamp: string;  // timestamp时间戳
  sign: string;       // signed string签名字符串
}

export class WechatPlugin {

  public static isInstalled() {
    return new Promise((resolve, reject) => {
      Wechat.isInstalled(result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }

  public static sendPaymentRequest(params: WechatPayParam) {
    return new Promise((resolve, reject) => {
      Wechat.sendPaymentRequest(params, result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }
} 