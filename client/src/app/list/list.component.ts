import { Component, OnInit, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Element, getEmptyElement } from '../services/elements';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { ModalComponent } from '../modal/modal.component';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  inputs: ['elements', 'service', 'nested', 'nestedLevel', 'markers']
})

export class ListComponent implements OnInit {
  @ViewChild(EditFormComponent) editFormComponent: EditFormComponent;
  @ViewChild(ModalComponent) modalComponent: ModalComponent;
  @ViewChild(StatsComponent) statsComponent: StatsComponent;
  @ViewChild('searchInput') searchInputElement;
  @Output() listClick = new EventEmitter();

  collection: any[];
  fullCollection: any[];
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
  markers: any;
  isLoaded: boolean = false;

  constructor() { }

  private fetch(): void {
    this.service.get()
      .then(collection => {
        this.collection = collection;
        this.fullCollection = collection;
        if (this.service.isNested)
          this.filterCollection();
        this.closeAll();
        this.markAll();
        this.isLoaded = true;
      })
      .catch(error => console.log(error))
  }

  private filterCollection(): void {
    this.collection = this.fullCollection.filter((el) => {
      if (!el.series) {
        return true;
      }
      if (this.markers)
        return (el.series === this.markers.url);
      return false;
    })
  }

  private markAll(): void {
    if (this.service.isNested) {
      this.filterCollection();
    }
    this.collection.forEach((el) => {
      el.options = { mark: this.markValid(el) }
    })
  }

  private markValid(el): number {
    if (this.markers && !this.service.isNested) {
      let markList = this.markers[this.service.name];
      if (markList.indexOf(el.url) > -1) {
        return 2;
      }
      return 1;
    }
    return 0;
  }

  private closeAll(): void {
    this.collection.forEach((el) => {
      el.options = { clicked: false };
    })
  }

  private onClickElement(event, element): void {
    event.stopPropagation();
    let actual: boolean = element.options.clicked;
    if (this.service.name == 'Series') {
      this.closeAll();
      element.options.clicked = !actual;
    }
    this.listClick.emit(element.options.clicked ? element : null);
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
    this.modalComponent.showChildModal((ev) => this.submitRemove(ev), "Are you sure?", "DELETE", element);
  }

  private onEdit(event, element): void {
    event.stopPropagation();
    this.editFormComponent.showChildModal(element, this.editFormComponent.put);
  }

  private onAdd(event): void {
    event.stopPropagation();
    this.editFormComponent.showChildModal(getEmptyElement(this.elements), this.editFormComponent.post);
  }

  private onMark(event, element): void {
    event.stopPropagation();
    this.modalComponent.showChildModal((ev) => this.submitMark(ev), "Are you sure?", "TOGGLE MARK", element);
  }

  private showStats(event, element): void {
    event.stopPropagation();
    this.statsComponent.showChildModal(element);
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

  private submitError(): void {
    this.fetch();
  }

  private submitModal(response): void {
    response.callback(response.data);
  }

  private submitRemove(element): void {
    this.service.delete(element[this.service.id], this.service.isNested ? element[this.service.idNested] : null).then(() => {
      this.fetch();
    }).catch(() => {
      this.fetch();
      this.modalComponent.showChildModal(() => { }, "Failed remove.", "OK", null);
    });
  }

  private submitMark(element): void {
    let source = this.markers[this.service.name];
    let index = source.indexOf(element.url);
    if (index === -1) {
      source.push(element.url);
    } else {
      source.splice(index, 1);
    }
    let promise = this.service.putParent(this.markers.title, this.markers);
    promise.then(() => {
      this.markAll();
    }).catch((status) => {
      index = source.indexOf(element.url);
      source.splice(index, 1);
      this.fetch();
      this.modalComponent.showChildModal(() => { }, "Failed mark.", "OK", null);
    });
  }

  ngOnInit() {
    this.indexClass = 'col-md-' + this.nestedLevel;
    this.fetch();
  }

  ngOnChanges() {
    if (this.isLoaded)
      this.markAll();
  }

}
