import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  myForm: FormGroup;
  elements: Element[];
  collection: any[];
  service: any;
  fields: any;
  isReady: boolean = false;

  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef) {
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

  public showChildModal(value: any): void {
    this.fields = value;
    this.myForm = this.toFormGroup();
    this.isReady = true;
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
    this.isReady = false;
  }

  private onSubmit(value: any): void {
    console.log(value); //#todo fix post
    this.service.post(value);
  }

  private toFormGroup(): FormGroup {
    let group: any = {};
    this.elements.forEach(el => {
      group[el.value] = el.required ? new FormControl(this.fields[el.value] || '', Validators.required)
        : new FormControl(this.fields[el.value] || '');
    })
    return new FormGroup(group);
  }

  ngOnInit() { }
}
