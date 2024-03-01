import {Component, Injector, Input} from '@angular/core';
import {BaseComponent} from "@app/components/base/base.component";
import {ChartType} from "chart.js";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss']
})
export class HistoricalDataComponent extends BaseComponent {

  @Input() currencyFrom: string | undefined;
  @Input() currencyTo: string | undefined;

  public labels: any[] = [];
  chart: Chart<ChartType, string[], any> | undefined;
  public historicalData: any = undefined
  public dataSet: any = undefined
  public months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {

    this.currencyService.formUpdates.subscribe(res => {
      this.currencyFrom = res?.from;
      this.currencyTo = res?.to;
      this.historicalData = this.currencyService.getHistoricalData(res?.from, res?.to);
      this.returnCalendarDays();
    });

  }

  returnCalendarDays() {
    // this loads months
    this.labels = Object.keys(this.historicalData);
    this.labels = this.labels.map(mon => this.months[new Date(mon).getMonth()]);


    this.dataSet = [
      {
        label: this.currencyFrom,
        data: Object.values(this.historicalData).map((val: any) => val[this!.currencyFrom!]),
        backgroundColor: 'limegreen'
      },
      {
        label: this.currencyTo,
        data: Object.values(this.historicalData).map((val: any) => val[this!.currencyTo!]),
        backgroundColor: 'orange'
      },
    ]
    // create chart
    this.createChart();
  }

  createChart() {
    this.chart?.destroy();
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {
        labels: this.labels,
        datasets: this.dataSet
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

}
