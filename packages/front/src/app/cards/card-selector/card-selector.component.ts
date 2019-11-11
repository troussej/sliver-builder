import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Card } from '../card';
import * as _ from 'lodash';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.css']
})
export class CardSelectorComponent implements OnInit {

  @Input() cards: Card[];
  selectedCard: Card;
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.selectedCard = _.first(this.cards);
  }

  handleChange() {
    this.selected.emit(this.selectedCard);
  }

}
