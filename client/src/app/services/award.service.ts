import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class AwardService extends BaseService {
  id: String = 'series';
  name: String = 'awards';

  constructor(http: Http) {
    super(http, 'http://localhost:8000/award/');
  }

  setUrl(parentURL: String) {
    super.setUrl(parentURL + '/award/');
  }

}
