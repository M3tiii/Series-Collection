import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class SeriesService extends BaseService {
  id: String = 'title';
  name: String = 'Series';

  constructor(http: Http) {
    super(http, 'http://localhost:8000/series/');
  }

}
