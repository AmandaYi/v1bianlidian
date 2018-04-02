import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams,XHRBackend, RequestOptionsArgs, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class Ajax extends Http {
	constructor(_backend: XHRBackend, _defaultOptions: RequestOptions ) {
		super(_backend,_defaultOptions);
	}

	  
	private debug = true;
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    
	post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
		return super.post(url, this.urlEncode(body), { headers: this.headers, withCredentials: true })
			.map(val => this.responseHandel(val))
			.do(val => this.codeHandel(val))
	}

	put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
		return super.put(url, this.urlEncode(body), { headers: this.headers, withCredentials: true })
			.map(val => this.responseHandel(val))
			.do(val => this.codeHandel(val));
	}
	
	get(url: string, body?: any, options?: RequestOptionsArgs) { 
		return super.get(body ? url + '?' + this.urlEncode(body) : url, { headers: this.headers, withCredentials: true })
			.map(val => this.responseHandel(val))
			.do(val => this.codeHandel(val));
	}

	delete(url: string, body?: any, options?: RequestOptionsArgs) {
		return super.delete(body ? url + '?' + this.urlEncode(body) : url, { headers: this.headers, withCredentials: true })
			.map(val => this.responseHandel(val))
			.do(val => this.codeHandel(val));
	}

	responseHandel(response: Response) {
		// var jsonStart = response['_body'].indexOf('{');
		// if (jsonStart) {
		// 	response['_body'] = response['_body'].substr(jsonStart);
		// 	this.showLog(console.error, 'response has error', response.url, response.json());
		// }
		return response;
	}

	codeHandel(response: Response) {
	}

	showLog(fun,...opt) {
		if (this.debug) {
			fun.apply(this, opt);
		}
	}

	urlEncode(obj: Object): string {
		let urlSearchParams = new URLSearchParams();
		for (let key in obj) {
			if (typeof (obj[key]) == 'object') {
				urlSearchParams.append(key, JSON.stringify(obj[key]));
			} else {
				urlSearchParams.append(key, obj[key]);
			}
		}
		return urlSearchParams.toString();
	}
}
