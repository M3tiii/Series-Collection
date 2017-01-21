import { Component, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ViewContainerRef } from '@angular/core';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;
  @Output() submitSuccess = new EventEmitter();
  header: string;
  content: string;
  data: any;
  callback: any;

  public showChildModal(callback, header: string, content: string, data = null): void {
    this.callback = callback;
    this.header = header;
    this.content = content;
    this.data = data;
    this.childModal.show();
  }

  public hideChildModal(): void {
    // this.clear();
    this.childModal.hide();
  }

  public accept(): void {
    this.submitSuccess.emit({ data: this.data, callback: this.callback });
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
