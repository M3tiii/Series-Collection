import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Element } from '../services/elements';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { ViewContainerRef } from '@angular/core';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';

import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  providers: [StatsService, { provide: ComponentsHelper, useClass: ComponentsHelper }],
})

export class StatsComponent implements OnInit {
  parent: any;
  collection: any;
  isLoaded: boolean = false;
  maxRating: number = 10;
  isReadonly: boolean = false;
  fields: any[];
  errorExternal: string[];
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private service: StatsService, componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef) {
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

  public showChildModal(value: any): void {
    this.isLoaded = false;
    this.fields = [
      { title: 'Filmweb', name: 'ratingF', type: 'number', rating: true, isError: false, errorText: '', isDisabled: false },
      { title: 'Votes', name: 'votesF', type: 'number', rating: false, isError: false, errorText: '', isDisabled: false },
      { title: 'IMDb', name: 'ratingI', type: 'number', rating: true, isError: false, errorText: '', isDisabled: false },
      { title: 'Votes', name: 'votesI', type: 'number', rating: false, isError: false, errorText: '', isDisabled: false },
      { title: 'Views', name: 'views', type: 'number', rating: false, isError: false, errorText: '', isDisabled: true },
      { title: 'Average views', name: 'avViews', type: 'number', rating: false, isError: false, errorText: '', isDisabled: true }
    ]
    this.errorExternal = [];
    this.parent = value;
    this.childModal.show();
    this.service.setUrl(this.parent.title)
    this.fetch();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  private fetch(): void {
    this.service.get()
      .then(collection => {
        this.collection = collection.length ? collection[0] : this.getEmpty();
        this.isLoaded = true;
      })
  }

  private onSubmit(): void {
    let promise;
    if (this.collection.id)
      promise = this.service.put(this.collection.id, this.collection);
    else
      promise = this.service.post(this.collection);

    promise.then(() => {
      this.hideChildModal();
    }).catch((status) => {
      this.handleError(status);
    });
  }

  private handleError(status: any): void {
    const body = status.json() || '';
    console.log(body, this);
    for (let error in body) {
      let element = this.fields.filter(x => x.name == error)[0];;
      if (element) {
        element.isError = true;
        element.textError = body[error];
      } else
        this.errorExternal.push(body[error]);
    };
  }

  private getEmpty(): any {
    return {
      ratingF: 0,
      ratingI: 0,
      votesF: 0,
      votesI: 0
    }
  }

  ngOnInit() {
  }

}
