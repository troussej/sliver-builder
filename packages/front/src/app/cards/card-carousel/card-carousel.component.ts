import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselComponent implements OnInit {

  @Input() cards: Card[];

  constructor() { }

  ngOnInit() {
  }

}
