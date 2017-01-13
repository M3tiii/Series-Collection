import { Component, OnInit, Input } from '@angular/core';
import { Element, setupElements } from '../services/elements';
import { EpisodeService } from '../services/episode.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css'],
  providers: [EpisodeService],
})
export class EpisodeComponent implements OnInit {
  elements: Element[];
  level: number;

  constructor(private service: EpisodeService) {
    this.elements = [];
    setupElements(this.elements, [
      // { header: "season", value: "season", isSortable: true },
      { header: "number", value: "number", isSortable: true },
      { header: "title", value: "title", isSortable: true },
      { header: "Release Date", value: "releaseDate", isSortable: true },
      { header: "Runtime", value: "runtime", isSortable: true },
    ])
  }

  listClick(element) {
    // console.log(element);
  }

  ngOnInit() { }

}
