import { Component, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ViewContainerRef } from '@angular/core';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  inputs: ['header', 'content']
})
export class ModalComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;
  @Output() submitSuccess = new EventEmitter();
  header: string;
  content: string;
  data: any;

  public showChildModal(data = null): void {
    this.data = data;
    this.childModal.show();
  }

  public hideChildModal(): void {
    // this.clear();
    this.childModal.hide();
  }

  public accept(): void {
    this.submitSuccess.emit(this.data);
    this.hideChildModal();
  }

  public clear(): void {
    if (this.data != null)
      for (var member in this.data) delete this.data[member];
  }

  constructor(componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef) {
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

  ngOnInit() {
  }

}
