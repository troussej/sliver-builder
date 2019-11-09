import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommanderComponent } from './decks/commander/commander.component';
import { MainComponent } from './pages/main/main.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CardCarouselComponent } from './cards/card-carousel/card-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    CommanderComponent,
    MainComponent,
    CardCarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
