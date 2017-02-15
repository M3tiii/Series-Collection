import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class CompanyService extends BaseService {
  id: String = 'id_company';
  name: String = 'company';

  constructor(http: Http) {
    super(http, '/company/');
  }

  setUrl(parentURL: String) {
    super.setUrl(parentURL + '/company/');
  }

}
