import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CardPackage } from 'sliver-builder-common';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  public getDeckConfig(): Observable<CardPackage[]> {
    return this.http.get<CardPackage[]>(environment.apiRoot + '/api/deckconfig');
  }

  public getDeck(options: CardPackage[]): any {
    return null;
  }


}
