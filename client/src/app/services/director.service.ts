import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class DirectorService extends BaseService {
  id: String = 'id_director';
  name: String = 'directors';

  constructor(http: Http) {
    super(http, 'http://localhost:8000/director/');
  }

  setUrl(parentURL: String) {
    super.setUrl(parentURL + '/director/');
  }

}
