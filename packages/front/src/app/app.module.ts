import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MainComponent } from './pages/main/main.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DeckListComponent } from './decks/deck-list/deck-list.component';
import { CardRadioComponent } from './cards/card-radio/card-radio.component';
import { CardsChecklistComponent } from './cards/cards-checklist/cards-checklist.component';
import { PackageSwitchComponent } from './cards/package-switch/package-switch.component';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DeckListComponent,
    CardRadioComponent,
    CardsChecklistComponent,
    PackageSwitchComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
