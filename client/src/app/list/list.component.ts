import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { Element } from '../services/elements';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  providers: [SeriesService],
  inputs: ['elements'],
})
export class ListComponent implements OnInit {
  collection: any[];
  elements: Element[];

  constructor(private service: SeriesService) { }

  fetch() {
    this.service.get()
      .then(collection => this.collection = collection)
      .catch(error => console.log(error))
  }

  ngOnInit() {
    this.fetch();
  }

}
