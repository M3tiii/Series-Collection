import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { Element } from '../services/elements';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  providers: [SeriesService],
  inputs: ['elements']
})
export class ListComponent implements OnInit {
  @Output() listClick = new EventEmitter();
  collection: any[];
  elements: Element[];
  sortableElement: string = '';

  constructor(private service: SeriesService) { }

  fetch() {
    this.service.get()
      .then(collection => this.collection = collection)
      .catch(error => console.log(error))
  }

  onClickElement(element) {
    this.listClick.emit(element);
  }

  onClickHeader(element) {
    if ((this.sortableElement == element) && !(element.substr(0, 1) == '-')) {
      this.sortableElement = '-' + element;
    } else {
      this.sortableElement = element;
    }
  }

  ngOnInit() {
    this.fetch();
  }

}
