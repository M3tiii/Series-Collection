import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
  @Output() setSeries = new EventEmitter();
  elements: Element[];
  nested = SeasonComponent;
  level: number = 0;

  constructor(private service: SeriesService) {
    this.elements = [];

    setupElements(this.elements, [ //#todo add type && required
      { header: "Title", value: "title", isSortable: true, isEditable: true },
      { header: "Website", value: "website", isSortable: true, isEditable: true },
      { header: "Language", value: "language", isSortable: true, isEditable: true },
      { header: "Category", value: "category", isSortable: false, isEditable: true },
    ])
  }

  listClick(element) {
    this.setSeries.emit(element);
    // console.log(element);
  }

  ngOnInit() { }

}
