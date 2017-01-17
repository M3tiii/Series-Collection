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
  field: any;
  isReady: boolean = false;
  callback: any;
  id: string;
  @Output() submitSuccess = new EventEmitter();
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef) {
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

  public showChildModal(value: any, callback: any): void {
    console.log(this);
    this.callback = callback;
    this.field = value;
    this.myForm = this.toFormGroup();
    if (callback == this.put) {
      this.id = this.service.id;
      this.myForm.get(this.id).disable(true);
    }
    this.isReady = true;
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
    this.clearError();
    this.isReady = false;
  }

  public post(value: any) {
    let promise = this.service.post(value);
    promise.then(() => {
      this.hideChildModal();
      this.submitSuccess.emit();
    }).catch((status) => {
      this.handleError(status);
    });
  }

  public put(value: any) {
    value[this.id] = this.myForm.get(this.id).value;
    console.log(value);
    let promise = this.service.put(this.field[this.id], value);
    promise.then(() => {
      this.hideChildModal();
      this.submitSuccess.emit();
    }).catch((status) => {
      this.handleError(status);
    });
  }

  private handleError(status: any): void {
    this.clearError();
    const body = status.json() || '';
    console.log(body);
    for (let error in body) {
      let element = this.elements.filter(x => x.value == error)[0];
      element.isError = true;
      element.textError = body[error];
    };
  }

  private clearError(): void {
    this.elements.forEach(el => el.isError = false);
  }

  private blockId(element: any): boolean {
    return element.value === this.id;
  }

  private onSubmit(value: any): void {
    this.callback(value)
  }

  private toFormGroup(): FormGroup {
    let group: any = {};
    this.elements.forEach(el => {
      group[el.value] = el.required ? new FormControl(this.field[el.value] || '', Validators.required)
        : new FormControl(this.field[el.value] || '');
    })
    return new FormGroup(group);
  }

  ngOnInit() { }
}
