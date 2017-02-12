import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';

@Injectable()
export class AwardService extends BaseService {
  id: string = 'id_award';
  idNested: string = 'id_grant';
  urlId: string = 'http://localhost:8000/awards/';
  urlNested: string = 'http://localhost:8000/grants/'
  name: string = 'awards';
  grantUrl = '/grants';
  isNested: boolean = true;

  constructor(http: Http) {
    super(http, 'http://localhost:8000/awards/');
  }

  setUrl(parentURL: string) {
    super.setUrl(parentURL + '/awards/');
  }

  put(elementId: string, value: any, seriesUrl: string = ''): any {
    //PUT AWARD
    super.setUrl(this.urlId);
    let promiseAward = super.put(elementId, value)
    let promiseAwardGrant, promiseGrant, promises;
    //PUT GRANT
    if (value[this.idNested]) {
      elementId = value[this.idNested];
      super.setUrl(this.urlNested);
      promiseGrant = super.put(elementId, value);
    }
    //POST AWARD-GRANT
    else if (value.date && seriesUrl != '') {
      value.series = seriesUrl;
      value.award = value.url;
      super.setUrl(this.urlNested);
      promiseAwardGrant = super.post(value)
    }
    promises = Promise.all([promiseAward, promiseGrant, promiseAwardGrant]);
    return promises;
  }

  delete(elementId: string, nestedId: string = null): any {
    let deletePromise;
    if (nestedId != null) {
      super.setUrl(this.urlNested);
      deletePromise = super.delete(nestedId);
    } else {
      super.setUrl(this.urlId);
      deletePromise = super.delete(elementId);
    }
    return deletePromise;
  }

  post(value: any, url: string): any {
    super.setUrl(this.urlId);
    return super.post(value, url);
  }

  get() {
    let awardCall = super.get(this.urlId);
    let grantCall = super.get(this.urlNested);
    let res = [];
    let promise = new Promise(
      function(resolve, reject) {
        awardCall.then((awardResult) => {
          grantCall.then((grantResult) => {
            awardResult.forEach((award) => {
              grantResult.forEach((grant) => {
                if (award.url === grant.award) {
                  res.push(Object.assign({}, award, grant));
                }
              })
            })
            res = res.concat(awardResult)
            resolve(res);
          })
        });
      }
    );
    return promise;
  }

}
