import { Component, OnInit } from '@angular/core';
import { Element, setupElements } from '../services/elements';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  elements: Element[];

  constructor() {
    this.elements = [];

    setupElements(this.elements, [
      { header: "Title", value: "title" },
      { header: "Website", value: "website" },
      { header: "Language", value: "language" },
      { header: "Category", value: "category" },
    ])
  }

  listClick(element) {
    console.log(element);
  }

  ngOnInit() {
  }

}
