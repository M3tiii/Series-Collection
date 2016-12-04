import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Element } from '../services/elements';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  inputs: ['elements', 'service', 'nested', 'nestedLevel']
})

export class ListComponent implements OnInit {
  @ViewChild(EditFormComponent) editFormComponent: EditFormComponent
  @Output() listClick = new EventEmitter();
  collection: any[];
  service: any;
  elements: Element[];
  sortableElement: string = '';
  sortableType: string = '+';
  nested: any;
  nestedLevel: number;
  indexClass: string;
  colors: string[] = ['#333', '#555', '#777', '#eee'];

  constructor() { }

  fetch() {
    this.service.get()
      .then(collection => this.collection = collection)
      .catch(error => console.log(error))
  }

  onClickElement(evenet, element) {
    event.stopPropagation();
    element.clicked = !element.clicked;
    this.listClick.emit(element);
  }

  onClickHeader(event, element) {
    event.stopPropagation();
    let header = element.value;
    if (element.isSortable) {
      if ((this.sortableElement == header) && (this.sortableType != '-')) {
        this.sortableElement = header;
        this.sortableType = '-';
      } else {
        this.sortableElement = header;
        this.sortableType = '+';
      }
    }
  }

  onRemove(event, element) {
    event.stopPropagation();
    let index = this.collection.indexOf(element);
    this.collection.splice(index, 1);
    // #TODO sent post to database
  }

  onEdit(event, element) {
    event.stopPropagation();
    this.editFormComponent.showChildModal(element);
  }

  getThemeColor(level = this.nestedLevel): string {
    return this.colors[level];
  }

  getThemeWidth(): string {
    return this.nestedLevel * 20 + 40 + 'px';
  }

  ngOnInit() {
    this.indexClass = 'col-md-' + this.nestedLevel;
    this.fetch();
  }

}
