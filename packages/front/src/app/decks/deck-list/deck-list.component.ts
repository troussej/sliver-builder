import { Component, OnInit, Input } from '@angular/core';
import { Deck } from '../deck';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

  @Input() deck: Deck;

  constructor() { }

  ngOnInit() {
  }

}
