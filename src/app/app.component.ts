import { IsPlarform } from './../providers/contant';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Variable } from "../global/variable";
import { AppGlobal } from "../AppGlobal";
import { TabsPage } from "../pages/tabs/tabs";
import { Ajax } from "./ajax";
import { AppConfig } from "./app.config";
import { LocationPage } from "../pages/home/location/location";


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = TabsPage;
  // rootPage: any;
  search
  userCode: any;  //用户标示
  token: any; //用户密钥

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public appGlobal: AppGlobal,
    private ajax: Ajax,
  ) {
    platform.ready().then(() => {

      if (IsPlarform) {
        //本地调试使用
        localStorage.setItem('latname', '113.780669')
        localStorage.setItem('lngname', '23.034722')
        let loginParam = {
          account: '13794836380',
          password: 'qq123456',
          authcode: '666666', //验证码(选填)
          userAgent: 'Android',//终端类型
        }
        // this.ajax.get('http://appapi.lmchaoshi.com/user/login', loginParam)
        this.ajax.get('http://39.108.49.210:8066/user/login', loginParam)
          .map(d => d.json())
          .subscribe(r => {
            console.log(r)
            if (r.code == 200) {

              localStorage.setItem('ifLogin', r.code);
              localStorage.setItem('userCode', r.data.userCode);
              localStorage.setItem('token', r.data.token);
              localStorage.setItem('sex', r.data.userInfo.sex);
              localStorage.setItem('headimgurl', r.data.userInfo.avatarPath);
              localStorage.setItem('birthday', r.data.userInfo.birthday);
              localStorage.setItem('mobileno', r.data.mobileno);

              this.search = "http://appapi.lmchaoshi.com?userToken=" + r.data.token + "&userCode=" + r.data.userCode + "&userAgent=" + AppConfig.userAgent + '&getLng=' + '113.780669' + '&getLat=' + '23.034722' + '&mobileno=' + r.data.mobileno;
              console.log(this.search)

              let a;
              if (this.appGlobal.isAndroid() == true) {
                a = 'android';
              } else if (this.appGlobal.isIos() == true) {
                a = 'ios';
              }

              let userToken = this.search.split('=')[1].split('&')[0];
              let userCode = this.search.split('=')[2].split('&')[0];
              let userAgent = this.search.split('=')[3].split('&')[0];
              let mobileno = this.search.split('=')[6].split('&')[0];

              this.ajax.get(AppConfig.getDebugUrl + '/api/shop/msUser/lmCardLogin?userCode=' + userCode + '&userToken=' + userToken + '&userAgent=' + userAgent + '&mobile=' + mobileno)
                .toPromise()
                .then(response => {
                  if (response.json().resultCode == 200) {
                    localStorage.setItem('userId', response.json().data.passId);
                    localStorage.setItem('tokenId', response.json().data.tokenId);
                    localStorage.setItem('memberId', response.json().data.memberId);
                    localStorage.setItem('recordStatus', response.json().data.recordStatus);
                    localStorage.setItem('nickname', response.json().data.nickname);
                    localStorage.setItem('headimgurl', response.json().data.avatarpath);
                    localStorage.setItem('ifLogin', '200');
                  }
                })
              localStorage.setItem('userToken', userToken);
              localStorage.setItem('userCodes', userCode);
              localStorage.setItem('userAgent', userAgent);
              localStorage.setItem('mobileno', mobileno);

              let getLng = this.search.split('=')[4].split('&')[0];
              let getLat = this.search.split('=')[5].split('&')[0];
              console.log(getLng)
              console.log(getLat)
              // // console.log(window.location.search)
              localStorage.setItem('latname', getLat)
              localStorage.setItem('lngname', getLng)


            }


          });


      }
      // statusBar.styleDefault();
      // // statusBar.hide();
      // splashScreen.hide();
      // // (<any>window).navigator.splashscreen.hide(); 

      // if (localStorage.getItem('firstIn')) {
      //   this.rootPage = TabsPage;
      // } else {
      //   localStorage.setItem('firstIn', 'true');
      //   this.rootPage = LocationPage;
      // }
    });


    // setTimeout(() => {
    //   <any>window.addEventListener("message", (e) => {
    //     console.log(e.data);
    //     this.userCode = e.data.token;
    //     this.token = e.data.userCode
    //     if (e.source != window.parent) return;
    //   }, false);
    //   if (this.userCode && this.token) {
    //     this.ajax.get(AppConfig.getDebugUrl + '/api/shop/msUser/lmCardLogin?userCode=' + this.userCode + '&userToken=' + this.token + '&userAgent=' + AppConfig.userAgent)
    //       .toPromise()
    //       .then(response => {
    //         if (response.json().code == 200) {
    //           console.log(response.json().data)
    //         }
    //       })
    //   }
    // }, 3000);




    Variable.getInstance().isIos = appGlobal.isIos();

  }


}
