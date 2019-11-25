import { Component, OnInit, Input } from '@angular/core';
import { Deck } from 'sliver-builder-common';


@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

  @Input() deck: Deck;

  constructor () { }

  ngOnInit() {
  }

}
