import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { DeckStats } from 'sliver-builder-common';

import _ from 'lodash';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-mana-curve',
  templateUrl: './mana-curve.component.html',
  styleUrls: ['./mana-curve.component.css']
})
export class ManaCurveComponent implements OnInit, OnChanges {

  @Input() stats: DeckStats;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor (private logger: NGXLogger) { }

  ngOnInit() {
    this.transformData();
  }

  ngOnChanges() {
    this.transformData();
  }

  private transformData(): void {

    let curve = this.stats.curve;
    // barChartLabels
    let maxCurve: number = Math.max(..._.map(Object.keys((curve)), (v: string) => +v));
    this.logger.debug('maxCurve %s', maxCurve);
    this.barChartLabels = _.map(Array.from(Array(maxCurve + 1).keys()), val => "" + val);

    this.barChartData =
      [
        { data: this.barChartLabels.map((key: string) => curve[key] || 0) }
      ];

    this.logger.debug('barChartLabels %j', this.barChartLabels);
    this.logger.debug('barChartData %j', this.barChartData);

  }

}
