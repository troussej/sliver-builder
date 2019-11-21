import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend, Color } from 'ng2-charts';
import { ChartType, RadialChartOptions, ChartDataSets, ChartOptions } from 'chart.js';
import { NGXLogger } from 'ngx-logger';
import { ColorStats } from 'sliver-builder-common';

@Component({
  selector: 'app-deck-color-stats',
  templateUrl: './deck-color-stats.component.html',
  styleUrls: ['./deck-color-stats.component.css']
})
export class DeckColorStatsComponent implements OnInit, OnChanges {

  @Input() stats: ColorStats;
  @Input() titleKey: String;

  // Pie
  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public chartLabels: Label[] = Object.keys(new ColorStats());
  public chartColors: Color[] = [
    {
      backgroundColor: [
        '#eeeeee', // W
        '#4352bf', // U 
        '#111111', // B
        '#ce2424', // R
        '#259839', // G
      ]
    }
  ];
  public chartData: SingleDataSet = [];
  public chartType: ChartType = 'pie';
  public chartLegend = false;
  public chartPlugins = [];

  constructor(private logger: NGXLogger) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.setupChart();
  }

  ngOnChanges() {
    this.setupChart();
  }

  private setupChart() {
    this.chartData = Object.values(this.stats);
  }

}
