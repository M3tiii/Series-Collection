import { Component, OnInit, Input } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { AwardService } from '../services/award.service';
// import { GrantService } from '../services/grant.service';

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
      { header: "ID", value: "id_award", isSortable: true, isEditable: false },
      { header: "Name", value: "name", isSortable: true, isEditable: true },
      { header: "Year", value: "date", isSortable: false, isEditable: true },
    ])
  }

  getComponent() {
    return this;
  }

  listClick(element) { }

  ngOnInit() { }

}
