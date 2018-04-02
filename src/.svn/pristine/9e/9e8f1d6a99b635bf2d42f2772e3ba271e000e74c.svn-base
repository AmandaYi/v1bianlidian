import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { AppConfig } from "../../../app/app.config";

@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html'
})
export class AboutusPage {

  content: any;//正文内容

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: Http) {

  }

  ionViewWillEnter() {

    //查询关于我们内容
    this.http.get(AppConfig.getDebugUrl + '/api/shop/info/contContent/aboutus')
      .toPromise()
      .then(response => {
        this.content = response.json().message;
      })
  }

}
