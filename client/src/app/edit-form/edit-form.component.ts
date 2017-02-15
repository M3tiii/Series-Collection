import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Element } from '../services/elements';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { ViewContainerRef } from '@angular/core';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';

import { Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  providers: [{ provide: ComponentsHelper, useClass: ComponentsHelper }],
  inputs: ['elements', 'service', 'parent']
})
export class EditFormComponent implements OnInit {
  myForm: FormGroup;
  elements: Element[];
  collection: any[];
  service: any;
  field: any;
  parent: any;
  isReady: boolean = false;
  callback: any;
  id: string;
  externalError: string[];
  @Output() submitSuccess = new EventEmitter();
  @Output() submitError = new EventEmitter();
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef) {
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

  public showChildModal(value: any, callback: any): void {
    this.callback = callback;
    this.field = value;
    this.myForm = this.toFormGroup();
    if (callback == this.put) {
      this.id = this.service.id;
      if (this.myForm.get(this.id)) {
        this.myForm.get(this.id).disable(true);
      }
    }
    this.isReady = true;
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
    this.clearError();
    this.isReady = false;
  }

  private clearDate(value: any) {
    for (let atr in value) {
      if (atr.includes('Date') || atr.includes('date'))
        if (value[atr] == "")
          delete value[atr];
    }
    // return value;
  }
  public post(value: any) {
    // console.log('post', value);
    this.clearDate(value);
    let promise = this.service.post(value);
    promise.then(() => {
      this.hideChildModal();
      this.submitSuccess.emit();
    }).catch((status) => {
      this.handleError(status);
      this.submitError.emit();
    });
  }

  public put(value: any) {
    // console.log('put', value);
    this.clearDate(value);
    value[this.id] = this.myForm.get(this.id) ? this.myForm.get(this.id).value : this.field[this.id];
    Object.assign(this.field, value);
    console.log('put', this.field, this);
    let promise = this.service.put(this.field[this.id], this.field, this.parent ? this.parent.url : '');
    promise.then(() => {
      this.hideChildModal();
      this.submitSuccess.emit();
    }).catch((status) => {
      this.handleError(status);
      this.submitError.emit();
    });
  }

  private handleError(status: Response | any): void {
    // console.log('error', status);
    this.clearError();
    if (status instanceof Response) {
      const body = status.json() || '';
      console.log(body);
      for (let error in body) {
        let element = this.elements.filter(x => x.value == error)[0];
        if (element) {
          element.isError = true;
          element.textError = body[error];
        } else
          this.externalError.push(body[error]);
      };
    }
  }

  private clearError(): void {
    this.elements.forEach(el => el.isError = false);
    this.externalError = [];
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
      if (el.isEditable)
        group[el.value] = el.required ? new FormControl(this.field[el.value] || '', Validators.required)
          : new FormControl(this.field[el.value] || '');
    })
    return new FormGroup(group);
  }

  ngOnInit() { }
}
