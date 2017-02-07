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
  field: any;
  collection: any;
  isLoaded: boolean = false;
  max: number = 10;
  isReadonly: boolean = false;
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private service: StatsService, componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef) {
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

  public showChildModal(value: any): void {
    this.isLoaded = false;
    this.field = value;
    this.childModal.show();
    this.service.setUrl(this.field.title)
    this.fetch();
    console.log(this);
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
      console.log(status);
    });
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
