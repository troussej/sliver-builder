import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/cards/card';
import { CardsService } from 'src/app/services/cards.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private cards$: Observable<Card[]>;

  constructor(private cardService: CardsService) { }

  ngOnInit() {

    this.cards$ = this.cardService.getCards();
  }

}
