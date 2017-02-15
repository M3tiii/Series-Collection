import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class StatsService extends BaseService {
  id: String = 'id';
  name: String = 'Stats';

  constructor(http: Http) {
    super(http, '/series/');
  }

  setUrl(parentURL: string) {
    super.setUrl(this.apiURL + parentURL + '/stats/');
  }

}
