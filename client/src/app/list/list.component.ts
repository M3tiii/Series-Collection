import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  providers: [CollectionService]
})
export class ListComponent implements OnInit {
  series: any[];

  constructor(private seriesService: CollectionService) { }

  getSeries() {
    this.seriesService.getSeries()
      .then(series => this.series = series)
      .catch(error => console.log(error))
  }

  ngOnInit() {
    this.getSeries();
  }

}
