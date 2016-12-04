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
      (res: any) => {
        // We’ll subscribe to the request and capture the response
        let data = res.json();
        console.log(res);
        // If we get an id_token, we’ll know the request is successful so we’ll store the token in localStorage. We won’t handle the error use case for this tutorial.
        if (data.id_token) {
          // localStorage.setItem('jwt', data.id_token);
          // Finally, we’ll call our getUserInfo function which will get the user details from Auth0
          // this.getUserInfo(data);
        }
      }
    )
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
