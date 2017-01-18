import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Element, getEmptyElement } from '../services/elements';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  inputs: ['elements', 'service', 'nested', 'nestedLevel']
})

export class ListComponent implements OnInit {
  @ViewChild(EditFormComponent) editFormComponent: EditFormComponent;
  @ViewChild(ModalComponent) modalComponent: ModalComponent;
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
        this.closeAll();
      })
      .catch(error => console.log(error))
  }

  private closeAll(): void {
    this.collection.forEach((el) => {
      el.options = { clicked: false };
    })
  }

  private onClickElement(evenet, element): void {
    event.stopPropagation();
    let actual: boolean = element.options.clicked;
    this.closeAll();
    element.options.clicked = !actual;
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
    this.modalComponent.showChildModal(element);
  }

  private onEdit(event, element): void {
    event.stopPropagation();
    this.editFormComponent.showChildModal(element, this.editFormComponent.put);
  }

  private onAdd(event): void {
    event.stopPropagation();
    console.log(this);
    console.log(getEmptyElement(this.elements));
    this.editFormComponent.showChildModal(getEmptyElement(this.elements), this.editFormComponent.post);
  }

  private getThemeColor(level = this.nestedLevel): string {
    return this.colors[level];
  }

  private getThemeWidth(): string {
    return this.nestedLevel * 20 + 40 + 'px';
  }

  private submitSuccess(): void {
    this.fetch();
  }

  private submitRemove(element): void {
    this.service.delete(element[this.service.id]).then(() => {
      this.fetch();
      // let index = this.collection.indexOf(element);
      // this.collection.splice(index, 1);
    }).catch(() => {
      console.log("FAILED");
    });
  }

  ngOnInit() {
    this.indexClass = 'col-md-' + this.nestedLevel;
    this.fetch();
  }

}
