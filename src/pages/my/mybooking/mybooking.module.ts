import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { MyApp } from "../../../app/app.component";

import { MybookingPage } from "../mybooking/mybooking";
import { AppraisePage } from "./appraise/appraise";
import { CustomerservicePage } from "./customerservice/customerservice";
import { BookingdetailPage } from "./bookingdetail/bookingdetail";
import { BookingstatusPage } from "./bookingstatus/bookingstatus";

@NgModule({
  imports: [IonicModule.forRoot(MyApp,{backButtonText:'',tabsHideOnSubPages:true,mode:'ios'}),],
  declarations: [MybookingPage,AppraisePage,CustomerservicePage,BookingdetailPage,BookingstatusPage],
  entryComponents: [MybookingPage,AppraisePage,CustomerservicePage,BookingdetailPage,BookingstatusPage],
//   providers: [],
  exports: [IonicModule]
})
export class MybookingModule {
}
