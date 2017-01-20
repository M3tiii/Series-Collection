import { Component, OnInit, Input } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { ActorService } from '../services/actor.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
  providers: [ActorService],
  inputs: ['series']
})
export class ActorComponent implements OnInit {
  private series: any;
  private elements: Element[];
  private level: number = 0;

  constructor(private service: ActorService) {
    this.elements = [];
    setupElements(this.elements, [
      { header: "ID", value: "id_actor", isSortable: true },
      { header: "Name", value: "name", isSortable: true },
      { header: "Surname", value: "surname", isSortable: true },
      { header: "Birth Date", value: "birthDate", isSortable: true },
    ])
  }

  getComponent() {
    return this;
  }

  listClick(element) { }

  ngOnInit() { }

}
