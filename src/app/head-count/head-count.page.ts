import {  OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import {Chart} from 'chart.js';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-head-count',
  templateUrl: './head-count.page.html',
  styleUrls: ['./head-count.page.scss'],
})
export class HeadCountPage implements OnInit {
 // LineChart = [];

 @ViewChild('slider') slider: IonSlides ;
 page = '0';
  LineChart: any = [];
  BarChart: any = [];
 selectedTab(ind: number) {
   console.log('selected tab : ' + ind);
   this.slider.slideTo(ind);
 }
 segmentChanged() {
  this.slider.getActiveIndex().then( activePage => {
    // console.log('Test' + activePage );
    this.page = activePage.toString();
  });
}


  constructor() {
  }
  ngOnInit() {

    this.BarChart = new Chart('barChart_OverallHc', {
      type: 'bar',
      data: {
       // spanGaps: false,
        labels: ['FY19(TD)', 'FY19', 'FY20', 'FY21'],
      datasets : [
        {
       label: 'Offshore ',
       data: [269, 271, 334, 465],
       backgroundColor: [
        'rgba(54, 162, 235, 0.6)','rgba(54, 162, 235, 0.6)','rgba(54, 162, 235, 0.6)','rgba(54, 162, 235, 0.6)'
       //'rgba(255, 206, 86, 0.6)',
       //'rgba(255, 206, 86, 0.6)',
       //'rgba(255, 206, 86, 0.6)',
       /* 'rgba(255, 99, 132, 0.6)',
       'rgba(255, 99, 132, 0.6)',
       'rgba(255, 99, 132, 0.6)', */
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
     /*  'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)', */
     ],
      borderWidth: 2,
    },
    {
      label: 'Onsite',
      data: [15, 15, 31, 35],
      backgroundColor: [
        'rgb(184, 77, 255,0.6)',
        'rgb(184, 77, 255,0.6)',
        'rgb(184, 77, 255,0.6)',
        'rgb(184, 77, 255,0.6)',


     ],
     borderColor: [
      'rgb(184, 77, 255,1)',
      'rgb(184, 77, 255,1)',
      'rgb(184, 77, 255,1)',
      'rgb(184, 77, 255,1)',

     ],
     borderWidth: 2,
   },
    {
    label: 'Total',
    data: [284, 286, 365, 500],
    type: 'line',
   borderColor: 'grey',
   borderWidth: 3,
 }
 
]
      },
      options: {
        title: {
          text: 'HeadCount Summary',
          display: true
        },
        responsive : true,
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
                stepSize: 5,

            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              // stepSize: 10,
            }
          }]
        }
      }
     });

     this.BarChart = new Chart('barChart_QuaterHC', {
      type: 'bar',
      data: {
       // spanGaps: false,
        labels: ['FY19', 'FY20', 'FY21'],
      datasets : [
       {
       label: 'Q1',
       data: [195, 286, 395],
       backgroundColor: [
       'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)',
      ],
      borderColor: [
        'rgba(255,99,132,1)', 'rgba(255,99,132,1)', 'rgba(255,99,132,1)', 'rgba(255,99,132,1)',
     ],
      borderWidth: 2,
    },
    {
      label: 'Q2',
      data: [195, 295, 415],
      backgroundColor: [
      'rgba(54, 162, 235, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(54, 162, 235, 0.6)',
     ],
     borderColor: [
     'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)',
    ],
     borderWidth: 2,
   },
   {
    label: 'Q3',
    data: [240, 313, 441],
    backgroundColor: [
    'rgba(255, 206, 86, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 206, 86, 0.6)',
   ],
   borderColor: [
   'rgba(255, 206, 86, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 206, 86, 1)',
  ],
   borderWidth: 2,
 },
 {
  label: 'Q4',
  data: [271, 334, 465],
  backgroundColor: [
  'rgba(75, 192, 192, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(75, 192, 192, 0.6)',
 ],
 borderColor: [
 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)',
],
 borderWidth: 2,
},
]
      },
      options: {
        title: {
          text: 'Quarterwise HeadCount in each Financial Year',
          display: true
        },
        responsive : true,
        scales: {
          xAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true,
                stepSize: 5,

            }
          }],
          yAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true,
              // stepSize: 10,
            }
          }]
        }
      }
     });


    this.LineChart = new Chart('lineChart_PgmHc', {
      type: 'line',
      data: {
        labels: ['FY19(TD)', 'FY19', 'FY20', 'FY21'],
        datasets: [{
          label: 'Pallavi',
          data: [95, 97, 113, 148],
          fill: false,
          lineTension: 0.7,
          borderColor: 'red' ,
          borderWidth: 1,
      },
      {
        label: 'Anand',
        data: [47, 47, 70, 117],
        fill: false,
        lineTension: 0.7,
        borderColor: 'orange' ,
        borderWidth: 1,
    },
    {
      label: 'Ashfaq',
      data: [40, 40, 59, 81],
      fill: false,
      lineTension: 0.7,
      borderColor: 'green' ,
      borderWidth: 1,
  },
    {
      label: 'Ashish',
      data: [102, 102, 123, 154],
      fill: false,
      lineTension: 0.7,
      borderColor: 'blue' ,
      borderWidth: 1,
  }]

      },
      options: {
        title: {
          text: 'PGM wise HeadCount Trend',
          display: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              // stepSize: 10,
            }
          }]
        }
      }
    });

    this.LineChart = new Chart('lineChart_MonthwiseHc', {
      type: 'line',
      data: {
        labels: ['M-4(oct)', 'M-3(nov)', 'M-2(dec)', 'M-1(jan)', 'M(feb)', 'M+1(mar)', 'M+2(apr)', 'M+3(may)', 'M+4(jun)'],
        datasets: [{
          label: 'Pallavi',
          data: [85, 87, 89, 89, 89, 90, 92, 94, 95],
          fill: false,
          lineTension: 0.7,
          borderColor: 'red' ,
          borderWidth: 1,
      },
      {
        label: 'Anand',
        data: [50, 50, 50, 50, 50, 51, 52, 53, 54],
        fill: false,
        lineTension: 0.7,
        borderColor: 'orange' ,
        borderWidth: 1,
    },
    {
      label: 'Ashfaq',
      data: [35, 36, 37, 38, 39, 40 , 41, 42, 43],
      fill: false,
      lineTension: 0.7,
      borderColor: 'green' ,
      borderWidth: 1,
  },
    {
      label: 'Ashish',
      data: [92, 93, 94 , 95, 96, 97, 98, 99, 100],
      fill: false,
      lineTension: 0.7,
      borderColor: 'blue' ,
      borderWidth: 1,
  }]

      },
      options: {
        title: {
          text: 'Month-wise Headcount for PGM',
          display: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              // stepSize: 10,
            }
          }]
        }
      }
    });
  }

}
