import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { Variable } from "../global/variable";
declare var AMap;
@Component({
    selector: 'add-map',
    template: `
    <div id="tip" class="abc"></div>
    <div id="tip1" class="abc"></div>
    <span id="result" class="abc"></span>
    <div id="map_panel" class="abc"></div>
    <ion-content class="mapp">
        <div #map_container class="map_container"></div>
     </ion-content>
        `,
    styles: [`
  .mapp{
    display:none
  }
    .map_container{
        width:50%;
        height:50%;
    }
    .abc{display:none}
    `]
})

export class AddMap {
    @Input()
    test: string;
    list:any[];
    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public cartPage: ModalController) {

    }
    @ViewChild('map_container') map_container: ElementRef;
    map: any;//地图对象
    mapIsComplete: boolean = false;//地图是否加载完成
    ngOnInit() {//生命周期钩子
        setTimeout(() => this.loadMap(), 1000);//1秒后加载地图
        let loadNum = 0;
        let interval = setInterval(() => {//10秒后检测地图是否加载成功
            if (!this.map && loadNum < 5) {
                this.loadMap();
            } else {
                clearInterval(interval);
            }
        }, 10000);
    }

    loadMap() {
        let that = this;
        // let geolocation: any;
        that.map = new AMap.Map(this.map_container.nativeElement, {
            view: new AMap.View2D({//创建地图二维视口
                zoom: 11, //设置地图缩放级别
                rotateEnable: true,
                showBuildingBlock: true
            })
        });

        //两点计算
        // var lnglat = new AMap.LngLat(116.368904, 39.92342);
        // var myDistance1 = lnglat.distance([113.753337, 22.99183])
        // var myDistance2 = lnglat.distance([113.711116, 23.058232])
        // var myDistance3 = lnglat.distance([113.7052, 22.99138])
        // var myDistance4 = lnglat.distance([113.863196, 23.126942])
        
        var searchOptions = {
            query: { keywords: '东莞六沐便利店' },
            clickable: true,
            map: that.map, //地图对象
            panel: 'map_panel', //div的id或dom元素
            keywords: '', //关键字
            pageSize: 5, //页大小
            orderBy: '_distance:ASC' //排序规则
        };

        //加载CloudDataSearch服务插件 云数据检索服务
        AMap.service(["AMap.CloudDataSearch"], function () {
            var search = new AMap.CloudDataSearch('58e44e9aafdf520ea822b318', searchOptions);
            //  检索范围
            let latlng = [localStorage.getItem("lngname"), localStorage.getItem("latname")];
            // let ab = [113.734384, 23.043282]
            search.searchNearBy(latlng, 20000, function (status, result) {
                localStorage.setItem('Cloud', JSON.stringify(result));
            });
            AMap.event.addListener(search)

            search.searchByDistrict('广东省', function (status, result) {
                
                for (let i = 0; i < result.datas.length; i++) {
                    if( result.datas[i].shopid==Variable.getInstance().shopid){
                        sessionStorage.setItem('ln',result.datas[i]._location.lng)
                        sessionStorage.setItem('la',result.datas[i]._location.lat)
                        // this.list.push([result.datas[i]._location.lng,result.datas[i]._location.lat]);
                    }
                }
                localStorage.setItem('mess', JSON.stringify(result))
            });

        });

        //正地理编码
        AMap.service(["AMap.Geocoder"], function () {
            let ln=sessionStorage.getItem('ln')
            let la=sessionStorage.getItem('la')
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
                    var myDistance1 = lnglat.distance([ln,la])
                    console.log(myDistance1)
                    Variable.getInstance().distance=myDistance1
                }
            });
        });
        // 加载逆地理编码加载逆地理编码
        let lnglatXY = [116.396574, 39.992706]; //已知点坐标
        AMap.service(["AMap.Geocoder"], function () {
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            geocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    
                }
            });
        });

    }

}