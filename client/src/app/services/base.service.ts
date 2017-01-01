import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BaseService {
  clicked: boolean = false;

  constructor(private http: Http, private apiURL) { }

  get() {
    return this.http.get(this.apiURL)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  post(value: any) {
    this.http.post(this.apiURL, value).subscribe(
      (res: any) => { //#todo fix post
        let data = res.json();
        console.log(res);
        if (data.id_token) {
        }
      }
    )
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
