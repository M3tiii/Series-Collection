import { Component, OnInit } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { SeriesService } from '../services/series.service';
import { SeasonComponent } from '../season/season.component';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
  providers: [SeriesService],
})
export class SeriesComponent implements OnInit {
  elements: Element[];
  nested = SeasonComponent;
  level: number = 0;

  constructor(private service: SeriesService) {
    this.elements = [];

    setupElements(this.elements, [
      { header: "Title", value: "title", isSortable: true },
      { header: "Website", value: "website", isSortable: true },
      { header: "Language", value: "language", isSortable: true },
      { header: "Category", value: "category", isSortable: false },
    ])
  }

  listClick(element) {
    // console.log(element);
  }

  ngOnInit() { }

}
