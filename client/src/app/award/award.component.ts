import { Component, OnInit, Input } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { AwardService } from '../services/award.service';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.css'],
  providers: [AwardService],
  inputs: ['series']
})
export class AwardComponent implements OnInit {
  private series: any;
  private elements: Element[];
  private level: number = 0;

  constructor(private service: AwardService) {
    this.elements = [];
    setupElements(this.elements, [
      { header: "Series", value: "series", isSortable: true },
      { header: "Name", value: "name", isSortable: true },
      { header: "Year", value: "year", isSortable: true },
    ])
  }

  getComponent() {
    return this;
  }

  listClick(element) { }

  ngOnInit() { }

}
