import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Chart } from 'angular-highcharts';
import { chart } from 'highcharts';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {



  chart = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Stats'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: ['stats'],
        data: [
          { name: 'Completed', y: 1 },
          { name: 'ON going', y: 2 },
          { name: 'Started', y: 3 }
        ]
      } as any
    ]
  });

  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }


}
