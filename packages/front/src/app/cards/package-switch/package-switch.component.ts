import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CardPackage } from 'sliver-builder-common';

@Component({
  selector: 'app-package-switch',
  templateUrl: './package-switch.component.html',
  styleUrls: ['./package-switch.component.css']
})
export class PackageSwitchComponent implements OnInit {

  @Input() form: FormGroup;

  @Input() config: CardPackage;

  constructor() { }

  ngOnInit() {
  }

}
