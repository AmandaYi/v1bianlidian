import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

  loginWithCredentials(username: string, password: string): boolean {
    if (username === '5588')
      return true;
    return false;
  }

}
