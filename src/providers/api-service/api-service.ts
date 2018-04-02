import { HttpService } from './../HttpService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { AppConfig } from '../../app/app.config';

import 'rxjs/add/operator/map';

 

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  constructor(public http:HttpService) {
    console.log('Hello ApiServiceProvider Provider');
  }



}
