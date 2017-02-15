import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class ActorService extends BaseService {
  id: String = 'id_actor';
  name: String = 'actors';

  constructor(http: Http) {
    super(http, '/actor/');
  }

  setUrl(parentURL: String) {
    super.setUrl(parentURL + '/actor/');
  }

}
