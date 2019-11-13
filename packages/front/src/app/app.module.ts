import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './pages/main/main.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DeckListComponent } from './decks/deck-list/deck-list.component';
import { CardRadioComponent } from './cards/card-radio/card-radio.component';
import { CardsChecklistComponent } from './cards/cards-checklist/cards-checklist.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DeckListComponent,
    CardRadioComponent,
    CardsChecklistComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,

    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
