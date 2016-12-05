import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Element } from '../services/elements';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  inputs: ['elements', 'service', 'nested', 'nestedLevel']
})

export class ListComponent implements OnInit {
  @ViewChild(EditFormComponent) editFormComponent: EditFormComponent;
  @ViewChild('searchInput') searchInputElement;
  @Output() listClick = new EventEmitter();
  collection: any[];
  service: any;
  elements: Element[];
  sortableElement: string = '';
  sortableType: string = '+';
  nested: any;
  nestedLevel: number;
  indexClass: string;
  colors: string[] = ['#333', '#555', '#777', '#eee'];
  searchText: string = '';
  searchIsOpen: boolean = false;

  constructor() { }

  private fetch(): void {
    this.service.get()
      .then(collection => {
        this.collection = collection
        this.setup();
      })
      .catch(error => console.log(error))
  }

  private setup(): void {
    this.collection.forEach((el) => {
      el.options = { clicked: false };
    })
  }

  private onClickElement(evenet, element): void {
    event.stopPropagation();
    element.options.clicked = !element.options.clicked;
    this.listClick.emit(element);
  }

  private onClickHeader(event, element): void {
    event.stopPropagation();
    let header = element.value;
    if (element.isSortable) {
      if ((this.sortableElement == header) && (this.sortableType != '-')) {
        this.sortableElement = header;
        this.sortableType = '-';
      } else {
        this.sortableElement = header;
        this.sortableType = '+';
      }
    }
  }

  private onSearchHover(): void {
    this.searchIsOpen = true;
    setTimeout(() => {
      this.searchInputElement.nativeElement.focus();
    }, 400);
  }

  private onRemove(event, element): void {
    event.stopPropagation();
    let index = this.collection.indexOf(element);
    this.collection.splice(index, 1);
    // #TODO sent post to database
  }

  private onEdit(event, element): void {
    event.stopPropagation();
    this.editFormComponent.showChildModal(element);
  }

  private getThemeColor(level = this.nestedLevel): string {
    return this.colors[level];
  }

  private getThemeWidth(): string {
    return this.nestedLevel * 20 + 40 + 'px';
  }

  ngOnInit() {
    this.indexClass = 'col-md-' + this.nestedLevel;
    this.fetch();
  }

}
