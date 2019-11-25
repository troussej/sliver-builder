import { Component, OnInit, Input } from '@angular/core';
import { CardPackage, Deck, PackageSelectionState } from 'sliver-builder-common';
import { FormGroup } from '@angular/forms';
import _ from 'lodash';
import { config } from 'rxjs';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  @Input()
  public form: FormGroup;
  @Input()
  public formConfig: CardPackage[];
  @Input()
  public deck: Deck;

  activeIds: string[];

  constructor () { }

  ngOnInit() {
    this.activeIds = _.chain(this.formConfig)
      .filter(cfg => cfg.mode === PackageSelectionState.Manual)
      .map("name")
      .value();
  }

}
