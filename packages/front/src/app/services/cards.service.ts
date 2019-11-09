import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../cards/card';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private url = 'http://localhost:3000/api/commanders';

  constructor(private http: HttpClient) { }


  public getCards(): Observable<Card[]> {
    console.log('getcards');
    return this.http.get<Card[]>(this.url).pipe(tap(data => console.log(data)));

  }


}
