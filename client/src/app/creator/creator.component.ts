import { Component, OnInit, Input } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { CreatorService } from '../services/creator.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
  providers: [CreatorService],
  inputs: ['series']
})
export class CreatorComponent implements OnInit {
  private series: any;
  private elements: Element[];
  private level: number = 0;

  constructor(private service: CreatorService) {
    this.elements = [];
    setupElements(this.elements, [
      { header: "ID", value: "id_creator", isSortable: true, isEditable: false },
      { header: "Name", value: "name", isSortable: true, isEditable: true },
      { header: "Surname", value: "surname", isSortable: true, isEditable: true },
      { header: "Birth Date", value: "birthDate", isSortable: true, isEditable: true },
    ])
  }

  getComponent() {
    return this;
  }

  listClick(element) { }

  ngOnInit() { }

}
