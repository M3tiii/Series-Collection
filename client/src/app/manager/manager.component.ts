import { Component, OnInit } from '@angular/core';
import { Element } from '../services/elements';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  private series: any;
  private title: string = "Series";

  private setSeries(series) {
    this.series = series;
    this.title = series ? series.title : "Series";
  }

  constructor() {
  }

  ngOnInit() {
  }

}
