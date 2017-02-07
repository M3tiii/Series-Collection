import { Component, OnInit, Input } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { SeasonService } from '../services/season.service';
import { EpisodeComponent } from '../episode/episode.component';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
  providers: [SeasonService],
})
export class SeasonComponent implements OnInit {
  elements: Element[];
  nested = EpisodeComponent;
  level: number;

  constructor(private service: SeasonService) {
    this.elements = [];
    setupElements(this.elements, [
      { header: "Number", value: "number", isSortable: true, isEditable: true },
      { header: "Episodes", value: "episodes", isSortable: true, isEditable: false },
    ])
  }

  getComponent() {
    return this;
  }

  listClick(element) {
    // console.log(element);
  }

  ngOnInit() { }

}
