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
  @Output() submitSuccess = new EventEmitter();
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef) {
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

  public showChildModal(value: any): void {
    this.field = value;
    this.myForm = this.toFormGroup();
    this.isReady = true;
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
    this.isReady = false;
  }

  private onSubmit(value: any): void {
    let promise = this.service.put(this.field[this.service.id], value);
    promise.then(() => {
      console.log("SUCCESS");
      this.hideChildModal();
      this.submitSuccess.emit();
    }).catch(() => {
      console.log("FAILED");
    });
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
