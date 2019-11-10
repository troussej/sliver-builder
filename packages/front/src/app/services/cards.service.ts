import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../cards/card';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private url = environment.apiRoot + '/api/commanders';

  constructor(private http: HttpClient) { }


  public getCommanders(): Observable<Card[]> {

    return this.http.get<Card[]>(this.url);

  }


}
