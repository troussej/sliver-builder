import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'scryfall-sdk';
import { CardPackage } from 'sliver-builder-common';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

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

  constructor () { }

  ngOnInit() {
    // depending on the options size, we can adopt different columns size
    if (this.config.options.length <= 10) {
      this.colSize = 5;
      this.nbCols = Math.ceil(this.config.options.length / this.colSize);
    } else {

      this.nbCols = 4;// Math.ceil(this.config.options.length / this.colSize);
      this.colSize = Math.ceil(this.config.options.length / this.nbCols);
    }
    this.colIndexes = Array.from(Array(this.nbCols).keys());
  }


}
