import { Component, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { MyPage } from '../my/my';
import { DiscoveryPage } from '../discovery/discovery';
import { Tabs, NavParams } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  iconFoot = 'appname-footbar';
  iconMy = 'appname-my';
  iconStore = 'appname-store';
  iconShare = 'appname-share';
  iconHeart = 'appname-heart';
  iconHeartYellow = 'appname-heartYellow';
  tab1Root: any = HomePage;
  tab2Root: any = DiscoveryPage;
  tab3Root: any = MyPage;

  constructor(navParams: NavParams) {
    this.mySelfTab = navParams.get('tabIndexB');
    this.indexTab = navParams.get('indexTab');
  }

  //在这里，我们通过ViewChild来ion-tabs这个标签
  @ViewChild('myTabs') tabRef: Tabs;
  //初次加载时
  indexTab: boolean;
  mySelfTab: boolean;
  ionViewDidEnter() {
    //设置选项卡的索引值为2，即最后一个
    if (this.indexTab) {
      this.tabRef.select(0);
    } else if (this.mySelfTab) {
      this.tabRef.select(2);
    } else {
      return;
    }

  }

}
