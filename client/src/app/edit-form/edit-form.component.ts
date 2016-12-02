import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Element } from '../services/elements';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { ViewContainerRef } from '@angular/core';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  providers: [{ provide: ComponentsHelper, useClass: ComponentsHelper }],
  inputs: ['elements', 'service']
})
export class EditFormComponent implements OnInit {
  elements: Element[];
  collection: any[];
  service: any;

  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef) {
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

  public showChildModal(): void {
    this.childModal.show();
    console.log(this.childModal);
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  private fetch(): void {
    this.service.get()
      .then(collection => this.collection = collection)
      .catch(error => console.log(error))
  }

  ngOnInit() {
    this.fetch();
  }

}
