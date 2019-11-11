import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/cards/card';
import { CardsService } from 'src/app/services/cards.service';
import { Deck } from 'src/app/decks/deck';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public deck: Deck;
  public commanders$: Observable<Card[]>;

  constructor(private cardService: CardsService) { }

  ngOnInit() {
    this.deck = new Deck();
    this.commanders$ = this.cardService.getCommanders();
  }

  selectCommander($event) {
    // console.log('selectCommander', $event);

    this.deck.setCommander($event);
  }

}
