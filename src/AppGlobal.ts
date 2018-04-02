import { LoadingController, ToastController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';


@Injectable()
export class AppGlobal {
    private toast;
    private loading;

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        public platform: Platform
    ) {

    }
    /**
    * 显示提示信息
    *  message 信息内容
    *  duration 时长
    */
    showToast = (message: string = '操作完成', duration: number = 1500) => {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'top',
            // showCloseButton: true,
            // closeButtonText: '关闭'
        });
        this.toast.present();
    };

    /**
     * 统一调用此方法显示loading
     * content//提示文字
     */
    showLoading = (content: string = '') => {
        this.loading = this.loadingCtrl.create({
            content: content
        });
        this.loading.present();
        setTimeout(() => {//最长显示1秒
            this.loading.dismiss();
        }, 1000);
    };
    oNclose = (num: number) => {
        this.loading = this.loadingCtrl.create({
            duration: num
        });
        this.loading.present();
    }

    returnFloat = (value: any) => {//强制保留两位小数function
        value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
    }

    /**
   * 是否真机环境
   * @return {boolean}
   */
    isMobile(): boolean {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    }

    /**
     * 是否android真机环境
     * @return {boolean}
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }

    /**
     * 是否ios真机环境
     * @return {boolean}
     */
    isIos(): boolean {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    }

}
