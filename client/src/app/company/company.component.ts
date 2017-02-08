import { Component, OnInit, Input } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService],
  inputs: ['series']
})
export class CompanyComponent implements OnInit {
  private series: any;
  private elements: Element[];
  private level: number = 0;

  constructor(private service: CompanyService) {
    this.elements = [];
    setupElements(this.elements, [
      { header: "ID", value: "id_company", isSortable: true, isEditable: false },
      { header: "Name", value: "name", isSortable: true, isEditable: true },
      { header: "Country", value: "country", isSortable: true, isEditable: true },
    ])
  }

  getComponent() {
    return this;
  }

  listClick(element) { }

  ngOnInit() { }

}
