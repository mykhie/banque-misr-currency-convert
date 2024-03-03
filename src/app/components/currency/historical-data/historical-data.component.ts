import {Component, Injector, Input, OnInit} from '@angular/core';
import {BaseComponent} from "@app/components/base/base.component";
import {ChartType} from "chart.js";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss']
})
export class HistoricalDataComponent extends BaseComponent implements OnInit {

  @Input() currencyFrom: string | undefined;
  @Input() currencyTo: string | undefined;
  @Input() amount: number = 1;

  public labels: string[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: Chart<ChartType, string[], any> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public historicalData: any = undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dataSet: any = undefined
  public months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {

    if (this.currencyFrom && this.currencyTo) {
      this.historicalData = this.currencyService
        .getHistoricalData({amount: this.amount, to: this.currencyTo, from: this.currencyFrom}).subscribe(res => {
          this.historicalData = res?.rates;
          console.log(res);
          this.returnCalendarDays();
        }, error => {
          this.showError(error?.message || 'Server error message occurred');
        });
    }

  }

  returnCalendarDays() {
    // this loads months
    this.labels = Object.keys(this.historicalData);
    this.labels = this.labels.map(mon => this.months[new Date(mon).getMonth()]);

    if (this.currencyFrom && this.currencyTo) {
      const from = this.currencyFrom;
      const to = this.currencyTo;
      this.dataSet = [
        {
          label: this.currencyFrom,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: Object.values(this.historicalData).map((val: any) => val[from]),
          backgroundColor: 'limegreen'
        },
        {
          label: this.currencyTo,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: Object.values(this.historicalData).map((val: any) => val[to]),
          backgroundColor: 'orange'
        },
      ]
    }
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
