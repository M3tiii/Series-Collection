import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Element } from '../services/elements';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  inputs: ['elements', 'service', 'nested']
})
export class ListComponent implements OnInit {
  @Output() listClick = new EventEmitter();
  collection: any[];
  service: any;
  elements: Element[];
  sortableElement: string = '';
  sortableType: string = '+';
  nested: any;
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

  ngOnInit() {
    this.fetch();
  }

}
