import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { CardsService } from 'src/app/services/cards.service';
import { CardPackage } from 'sliver-builder-common';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {



  public form: FormGroup;
  public formConfig: CardPackage[];

  constructor(private cardService: CardsService) { }

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
            mode: new FormControl('')
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

  }

}
