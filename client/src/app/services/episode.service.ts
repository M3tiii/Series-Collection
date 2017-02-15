import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class EpisodeService extends BaseService {
  id: String = 'id';
  name: String = 'Episode';

  constructor(http: Http) {
    super(http, '/');
  }

  setUrl(parentURL: String) {
    super.setUrl(parentURL + '/episodes/');
  }

}
