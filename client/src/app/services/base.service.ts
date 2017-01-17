import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BaseService {
  clicked: boolean = false; // todo ?? what
  apiURL: String = 'http://localhost:8000/series/';

  constructor(private http: Http, private fullURL) { }

  get() {
    return this.http.get(this.fullURL)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  put(elementId: string, value: any): any {
    return this.http.put(this.fullURL + elementId + '/', value).toPromise().then(
      (res: any) => {
        let data = res.json();
        console.log(res);
        if (data.id_token) {
        }
      }
    ).catch(this.handleError);
  }

  post(value: any): any {
    return this.http.put(this.fullURL, value).subscribe(
      (res: any) => {
        let data = res.json();
        console.log(res);
        if (data.id_token) {
        }
      }
    )
  }

  delete(elementId: string): any {
    return this.http.delete(this.fullURL + elementId + '/').toPromise().then(
      (res: any) => {
        let data = res.json();
        console.log(res);
      }
    ).catch(this.handleError);
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
