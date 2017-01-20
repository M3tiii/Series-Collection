import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class CreatorService extends BaseService {
  id: String = 'id_creator';
  name: String = 'creators';

  constructor(http: Http) {
    super(http, 'http://localhost:8000/creator/');
  }

  setUrl(parentURL: String) {
    super.setUrl(parentURL + '/creator/');
  }

}
