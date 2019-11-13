import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Card } from 'scryfall-sdk';
import * as _ from 'lodash';

@Component({
  selector: 'app-card-radio',
  templateUrl: './card-radio.component.html',
  styleUrls: ['./card-radio.component.css']
})
export class CardRadioComponent implements OnInit {

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
