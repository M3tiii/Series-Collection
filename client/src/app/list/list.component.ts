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
  nested: any;
  constructor() { }

  fetch() {
    this.service.get()
      .then(collection => this.collection = collection)
      .catch(error => console.log(error))
  }

  onClickElement(ev, element) {
    this.collection.forEach(el => {
      el.clicked = false;
    })
    element.clicked = true;
    this.listClick.emit(element);
  }

  onClickHeader(element) {
    let header = element.value;
    if (element.isSortable)
      if ((this.sortableElement == header) && !(header.substr(0, 1) == '-')) {
        this.sortableElement = '-' + header;
      } else {
        this.sortableElement = header;
      }
  }

  ngOnInit() {
    this.fetch();
  }

}
