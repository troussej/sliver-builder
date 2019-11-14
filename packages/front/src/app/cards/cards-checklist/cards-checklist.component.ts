import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'scryfall-sdk';
import { CardPackage } from 'sliver-builder-common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cards-checklist',
  templateUrl: './cards-checklist.component.html',
  styleUrls: ['./cards-checklist.component.css']
})
export class CardsChecklistComponent implements OnInit {

  @Input() colSize: number = 5;
  @Input() form: FormGroup;

  @Input() config: CardPackage;
  nbCols: number;
  colIndexes: number[];

  constructor() { }

  ngOnInit() {
    this.nbCols = Math.ceil(this.config.options.length / this.colSize);
    this.colIndexes = Array.from(Array(this.nbCols).keys());
  }

}
