import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class SeriesService extends BaseService {
  id: String = 'title';
  name: String = 'Series';

  constructor(http: Http) {
    super(http, '/series/');
  }

  post(value: any) {
    let series = super.post(value);
    series.then(() => {
      super.post({}, this.apiURL + value.title + '/stats/').catch(error => console.log(error));
    })
    return series;
  }
}
