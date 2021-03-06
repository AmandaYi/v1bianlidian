import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { Variable } from "../global/variable";
declare var AMap;
@Component({
  selector: 'navi-map',
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
})// .abc{display:none}

export class NaviMap {
  @Input()
  test: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public cartPage: ModalController
  ) {

  }
  @ViewChild('map_container') map_container: ElementRef;
  map: any;//地图对象
  mapIsComplete: boolean = false;//地图是否加载完成
  lis: any[] = [];
  // formattedAddress: string = '';
  leta: any;
  letn: any;
  ngOnInit() {//生命周期钩子
    setTimeout(() => this.loadMap(), 1000);//1秒后加载地图
    let loadNum = 0;
    let interval = setInterval(() => {//10秒后检测地图是否加载成功
      if (!this.map && loadNum < 5) {
        this.loadMap();
      } else {
        clearInterval(interval);
      }
    }, 2000);
  }

  loadMap() {
    let that = this;
    let geolocation: any;
    that.map = new AMap.Map(this.map_container.nativeElement, {
      view: new AMap.View2D({//创建地图二维视口
        zoom: 11, //设置地图缩放级别
        rotateEnable: true,
        showBuildingBlock: true
      })
    });

    // that.map.on('complete', function () {
    //   that.mapIsComplete = true;
    //   AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {//添加工具条和比例尺
    //     that.map.addControl(new AMap.ToolBar());
    //     that.map.addControl(new AMap.Scale());
    //   });
    // });
    // function addCloudLayer() {
    //   //加载云图层插件
    //   that.map.plugin('AMap.CloudDataLayer', function () {
    //     var layerOptions = {
    //       query: { keywords: '东莞六沐便利店' },
    //       clickable: true,
    //       map: that.map, //地图对象
    //       panel: 'map_panel', //div的id或dom元素
    //       keywords: '', //关键字
    //       pageSize: 5, //页大小
    //       orderBy: '_id:ASC' //排序规则
    //     };
    //     var search = new AMap.CloudDataLayer('58e44e9aafdf520ea822b318', layerOptions); //实例化云图层类
    //     search.setMap(that.map); //叠加云图层到地图
    //     AMap.event.addListener(search);
    //     let latlng = [localStorage.getItem("lngname"),localStorage.getItem("latname")]
    //     search.searchNearBy(latlng, 800000, function(status, result){
    //       console.log(result);
    //     });
    //   });
    // }
    // addCloudLayer();

    //两点计算
    // var lnglat = new AMap.LngLat(116.368904, 39.923423);
    // var myDistance=lnglat.distance([116.387271, 39.922501])


    //正地理编码
    // AMap.service(["AMap.Geocoder"], function () {
    //   var geocoder = new AMap.Geocoder({
    //     city: Variable.getInstance().cit, //城市，默认：“全国”
    //     radius: 1000 //范围，默认：500
    //   });
    //   geocoder.getLocation(Variable.getInstance().Wholly, function (status, result) {
    //     if (status === 'complete' && result.info === 'OK') {
    //       console.log(result);
    //     }
    //   });
    // });

    // 加载逆地理编码
    // let lnglatXY = [116.396574, 39.992706]; //已知点坐标
    // AMap.service(["AMap.Geocoder"], function () {
    //   var geocoder = new AMap.Geocoder({
    //     radius: 1000,
    //     extensions: "all"
    //   });
    //   geocoder.getAddress(lnglatXY, function (status, result) {
    //     if (status === 'complete' && result.info === 'OK') {
    //       console.log(result);
    //     }
    //   });
    // });

    var searchOptions = {
      query: { keywords: '东莞六沐便利店' },
      clickable: true,
      map: that.map, //地图对象
      panel: 'map_panel', //div的id或dom元素
      keywords: '', //关键字
      pageSize: 5, //页大小
      orderBy: '_distance:ASC' //排序规则
    };

    this.lis = [];
    //加载CloudDataSearch服务插件 云数据检索服务
    AMap.service(["AMap.CloudDataSearch"], () => {
      var search = new AMap.CloudDataSearch('58e44e9aafdf520ea822b318', searchOptions);
      //  检索范围
      console.log(localStorage.getItem("lngname"))
      console.log(localStorage.getItem("latname"))
      let latlng = [localStorage.getItem("lngname"), localStorage.getItem("latname")];
       
      // let ab = [113.734384, 23.043282]
      search.searchNearBy(latlng, 50000, (status, result) => {    
        console.log(result)
        localStorage.setItem('Cloud', JSON.stringify(result));
      });
      AMap.event.addListener(search)
      search.searchByDistrict('广东省', (status, result) => {
        // let lat1 = result.datas[0]._location.lat;//东莞市南城区
        // let lng1 = result.datas[0]._location.lng;
        // for (let i = 0; i < result.datas.length; i++) {
        //   this.lis.push(result.datas[i]._location)
        // }
        //两点计算
        // var lnglat1 = new AMap.LngLat(lng1, lat1);
        localStorage.setItem('mess', JSON.stringify(result))
        for(let i=0;i<result.length;i++){
          if(result[i]._distance<=2000){
            Variable.getInstance().shopid=result[i].shopid;
            Variable.getInstance().Lately=result[i]._distance;
          }
        }

      });

    });

    //当前城市定位
    //  var citysearch = new AMap.CitySearch();
    AMap.service(['AMap.CitySearch'], () => {
      var citysearch = new AMap.CitySearch();
      citysearch.getLocalCity(function (status, result) {
        console.log(result.city)
        Variable.getInstance().formattedAddress = result.city;
      })
    })


    //加载CloudDataLayer服务插件 叠加云图
    // AMap.service(["AMap.CloudDataLayer"], function () {
    //   var layer = new AMap.CloudDataLayer('58e44e9aafdf520ea822b318');
    //   layer.setMap(that.map); //叠加云图层到地图
    //   layer.getMap()
    //   AMap.event.addListener(layer, 'click', function (result) {
    //     var clouddata = result.data;
    //     console.log(clouddata);
    //   })
    // })

    //加载DistrictSearch服务插件 行政区查询
    AMap.service(['AMap.DistrictSearch'], () => {
      //实例化DistrictSearch
      var districtSearch = new AMap.DistrictSearch({
        level: 'district',
        subdistrict: 3
      });
      //调用查询方法
      districtSearch.search('中国', function (status, result) {
        //TODO : 按照自己需求处理查询结果
        var subDistricts = result.districtList[0].districtList;
        sessionStorage.setItem('subDis', JSON.stringify(subDistricts))
        // console.log(subDistricts[18].districtList[2])
        sessionStorage.setItem('districtList', JSON.stringify(subDistricts[18].districtList[2]))
      })
    })
    //加载逆地理编码加载逆地理编码
    AMap.service(["AMap.Geocoder"], function () {
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
      geocoder.getAddress([localStorage.getItem("lngname"), localStorage.getItem("latname")], function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          console.log(result.regeocode)
          console.log(result.regeocode.formattedAddress)
          localStorage.setItem('formattedAddress', result.regeocode.formattedAddress)
        }else{
          // alert(result.info)
        }
      });
    });

    //混合定位
    that.map.plugin(['AMap.Geolocation'], () => {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 4000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB',       //定位按钮停靠位置，默认：'LB'，左下角
        useNative: true,            //是否使用安卓定位sdk用来进行定位
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      });
      that.map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息

    });
    //解析定位结果
    const onComplete = (data) => {
      // alert("info="+data.info+",message="+data.message);
      // localStorage.setItem('formattedAddress', data.formattedAddress)
      var str = ['定位成功'];
      str.push(that.test);
      str.push('经度：' + data.position.getLng());
      str.push('纬度：' + data.position.getLat());
      if (data.accuracy) {
        str.push('精度：' + data.accuracy + ' 米');
      }//如为IP精确定位结果则没有精度信息
      str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
      document.getElementById('tip').innerHTML = str.join('<br>');
      this.lis.push(data.position.getLng(), data.position.getLat())
      // localStorage.setItem("latname", data.position.lat);//纬度
      // localStorage.setItem("lngname", data.position.lng);//经度
      this.leta = data.position.getLat();
      this.letn = data.position.getLng();
      // 加载逆地理编码
      AMap.service(["AMap.Geocoder"], () => {
        // let latlng: any[] = [localStorage.getItem("lngname"), localStorage.getItem("latname")];
        // let aa = [113.935339, 22.529976]
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });

        geocoder.getAddress([localStorage.getItem('lngname'), localStorage.getItem('latname')], (status, result) => {
          console.log(status)
          console.log(result)
          if (result.info === 'OK') {
            console.log(result.regeocode.addressComponent)
            console.log(result.regeocode.addressComponent.city)
            Variable.getInstance().Locationcity = result.regeocode.addressComponent.city;
          }
        });
      });
    }
    //解析定位错误信息
    const onError = (data) => {
      document.getElementById('tip').innerHTML = '定位失败';
      localStorage.setItem("err", '无法获取您的位置信息【请到设置→隐私→定位服务中开启，否则可能影响到您的使用】')
    }

  }
}
// let lat1 = result.datas[0]._location.lat;//东莞市南城区
// let lng1 = result.datas[0]._location.lng;
// let lat2 = result.datas[1]._location.lat;//万江街道新城
// let lng2 = result.datas[1]._location.lng;
// let lat3 = result.datas[2]._location.lat;//南城区黄金路
// let lng3 = result.datas[2]._location.lng;
// let lat4 = result.datas[2]._location.lat;//惠州市博罗县
// let lng4 = result.datas[2]._location.lng;
// //两点计算
// var lnglat1 = new AMap.LngLat(lng1, lat1);
// var lnglat2 = new AMap.LngLat(lng1, lat1);
// var lnglat3 = new AMap.LngLat(lng1, lat1);
// var lnglat4 = new AMap.LngLat(lng1, lat1);
// var myDistance1 = lnglat1.distance(latlng)
// var myDistance2 = lnglat2.distance(latlng)
// var myDistance3 = lnglat3.distance(latlng)
// var myDistance4 = lnglat4.distance(latlng)
// this.lis.push(myDistance1, myDistance2, myDistance3, myDistance4)
// console.log(this.lis)