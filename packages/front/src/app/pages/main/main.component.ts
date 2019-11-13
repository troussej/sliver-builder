import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CardsService } from 'src/app/services/cards.service';
import { CardPackage } from 'sliver-builder-common';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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

    conf.forEach((question: CardPackage) => {
      group[question.name] = question.required ? new FormControl('', Validators.required)
        : new FormControl('');
    });

    return new FormGroup(group);
  }



}
