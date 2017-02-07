import { Component, OnInit, Input } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { DirectorService } from '../services/director.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css'],
  providers: [DirectorService],
  inputs: ['series']
})
export class DirectorComponent implements OnInit {
  private series: any;
  private elements: Element[];
  private level: number = 0;

  constructor(private service: DirectorService) {
    this.elements = [];
    setupElements(this.elements, [
      { header: "ID", value: "id_director", isSortable: true, isEditable: false },
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
