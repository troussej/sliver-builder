import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'scryfall-sdk';

@Component({
  selector: 'app-cards-checklist',
  templateUrl: './cards-checklist.component.html',
  styleUrls: ['./cards-checklist.component.css']
})
export class CardsChecklistComponent implements OnInit {

  @Input() options: Card[];

  constructor() { }

  ngOnInit() {
  }

}
