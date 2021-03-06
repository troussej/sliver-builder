import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { CardsService } from 'src/app/services/cards.service';
import { CardPackage, PackageSelectionState, Deck, DeckForm } from 'sliver-builder-common';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { Card } from 'sliver-builder-common/node_modules/scryfall-sdk';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public form: FormGroup;
  public formConfig: CardPackage[];
  public deck: Deck;

  constructor (private cardService: CardsService, private logger: NGXLogger) { }

  ngOnInit() {


    this.cardService.getDeckConfig().subscribe((conf: CardPackage[]) => {
      this.formConfig = conf;
      this.form = this.buildForm(conf);
    })
  }

  private buildForm(conf: CardPackage[]): FormGroup {
    let group: any = {};

    conf.forEach((pckg: CardPackage) => {

      switch (pckg.type) {
        case 'checkbox':
          let cardlist = _.chain(pckg.options)
            .map(elem => [elem.name, new FormControl(false)])
            .fromPairs()
            .value();

          group[pckg.name] = new FormGroup({

            cards: new FormGroup(
              cardlist
            ),
            mode: new FormControl(pckg.mode)
          }
          )
          break;
        default:
          group[pckg.name] = new FormGroup(
            {
              cards: pckg.required ? new FormControl('', Validators.required)
                : new FormControl(''),
              mode: new FormControl('')

            }
          )
      }


    });

    return new FormGroup(group);
  }



  onSubmit() {
    //transform the form to send to the backend
    let formVal: any = this.form.value;
    this.logger.debug('onSubmit  formVal=', formVal);

    let payload = this.buildPayload(formVal);

    this.cardService.postDeck(payload).subscribe((data: Deck) => {
      this.logger.debug('resp deckbuild', data);
      this.deck = data;
    })
  }

  private buildPayload(formVal: any) {
    let packages: CardPackage[] = _.map(formVal, (value, key) => {
      switch (key) {
        case 'commanders':
          return new CardPackage(key, true, null, [value.cards], PackageSelectionState.Manual);
          break;
        default:
          return new CardPackage(key, true, null, this.findCards(key, value.cards), value.mode);
      }
    });
    this.logger.debug('payload:', packages);
    let payload = new DeckForm(null, packages);
    return payload;
  }

  /**
   * Gets the card object from the package config
   */
  private findCards(packageName: string, cards: any): Card[] {
    let pkg: CardPackage = _.find(this.formConfig, ['name', packageName]);
    this.logger.debug('pkg', pkg);
    return _.chain(cards)
      .pickBy((val) => val)
      .tap(val => this.logger.debug('pickBy', val))
      .map((val, cardName) => _.find(pkg.options, ['name', cardName]))
      .tap(val => this.logger.debug('map', val))
      .value();
  }

}
