import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BaseService {
  apiURL: String = 'http://localhost:8000/series/';
  isNested: boolean = false;

  constructor(private http: Http, private fullURL) { }

  get(url: string = this.fullURL) {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  put(elementId: string, value: any, parent: string = ''): any {
    // console.log(this.fullURL, elementId + '/');
    return this.http.put(this.fullURL + elementId + '/', value).toPromise().then(
      (res: any) => {
        let data = res.json();
        if (data.id_token) {
        }
      }
    )//.catch(this.handleError);
  }

  putParent(elementId: string, value: any): any {
    return this.http.put(this.apiURL + elementId + '/', value).toPromise().then(
      (res: any) => {
        let data = res.json();
        if (data.id_token) {
        }
      }
    )//.catch(this.handleError);
  }

  post(value: any, url: string = this.fullURL): any {
    return this.http.post(url, value).toPromise().then(
      (res: any) => {
        let data = res.json();
        if (data.id_token) {
        }
      }
    )//.catch(this.handleError);
  }

  delete(elementId: string, nestedId: string = null): any {
    return this.http.delete(this.fullURL + elementId + '/').toPromise().then(
      (res: any) => {
        let data = res.json();
      }
    )//.catch(this.handleError);
  }

  setUrl(childURL: String) {
    this.fullURL = childURL;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
