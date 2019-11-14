import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';
import { CardPackage } from 'sliver-builder-common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-radio',
  templateUrl: './card-radio.component.html',
  styleUrls: ['./card-radio.component.css']
})
export class CardRadioComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() config: CardPackage;


  constructor() {
  }

  ngOnInit() {

  }

  handleChange() {

  }

}
