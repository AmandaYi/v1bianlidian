import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyApp} from '../../app/app.component';

import { LoginPage } from "./login";
import { RegisterPage } from "./register/register";
import { ForgetPage } from "./forget/forget";
import { ResetpasswordPage } from "./resetpassword/resetpassword";

@NgModule({
  imports: [IonicModule.forRoot(MyApp,{backButtonText:'',tabsHideOnSubPages:true,mode:'ios'}),],
  declarations: [LoginPage,RegisterPage,ForgetPage,ResetpasswordPage],
  entryComponents: [LoginPage,RegisterPage,ForgetPage,ResetpasswordPage],
//   providers: [],
  exports: [IonicModule]
})
export class LoginModule {
}
