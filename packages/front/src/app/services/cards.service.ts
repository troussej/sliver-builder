import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CardPackage, Deck, DeckForm } from 'sliver-builder-common';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor (private http: HttpClient) { }

  public getDeckConfig(): Observable<CardPackage[]> {
    return this.http.get<CardPackage[]>(environment.apiRoot + '/api/decks/config');
  }

  public postDeck(form: DeckForm): any {
    return this.http.post<Deck>(environment.apiRoot + '/api/decks', form);
  }


}
