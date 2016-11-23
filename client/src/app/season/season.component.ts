import { Component, OnInit, Input } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { SeasonService } from '../services/season.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
  providers: [SeasonService],
})
export class SeasonComponent implements OnInit {
  elements: Element[];

  constructor(private service: SeasonService) {
    this.elements = [];

    setupElements(this.elements, [
      { header: "series", value: "series", isSortable: true },
      { header: "number", value: "number", isSortable: true },
      { header: "episodes", value: "episodes", isSortable: true },
    ])
  }

  listClick(element) {
    console.log(element);
  }

  ngOnInit() { }

}
