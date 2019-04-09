import { Component, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import { Router } from '@angular/router';
import {IonSlides} from '@ionic/angular';


@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.page.html',
  styleUrls: ['./revenue.page.scss'],
})
export class RevenuePage implements OnInit {
 // BarChart: any = [];

  constructor( private router: Router) { }
  BarChart: any = [];
  @ViewChild('slider') slider: IonSlides ;
  page = '0';
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

  ngOnInit() {

    this.BarChart = new Chart('barChart_OverallRev', {
      type: 'bar',
      data: {
       // spanGaps: false,
        labels: ['FY19', 'FY20', 'FY21'],
      datasets : [
        {
       label: 'Target Offshore',
       data: [7.61, 10.41, 14.9],
       backgroundColor: [
       'rgba(54, 162, 235, 0.6)','rgba(54, 162, 235, 0.6)', 'rgba(54, 162, 235, 0.6)'

      ],
      borderColor: [
        'rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)'

     ],
      borderWidth: 2,
    },
    {
      label: 'Target Onsite',
      data: [0.61, 1.2, 3.6],
      backgroundColor: [
        'rgb(184, 77, 255,0.6)','rgb(184, 77, 255,0.6)','rgb(184, 77, 255,0.6)',
     ],
     borderColor: ['rgb(184, 77, 255,1)','rgb(184, 77, 255,1)','rgb(184, 77, 255,1)',

     ],
     borderWidth: 2,
   },
   {
    label: 'Total',
    data: [8.22, 11.61, 18.5],
    type: 'line',
    //backgroundColor: 'clear',
   borderColor: 'grey',
   borderWidth: 3,
 }
]
      },
      options: {
        title: {
          text: ' Revenue (in $ Mn)',
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

     this.BarChart = new Chart('barChart_YearlyRev', {
      type: 'bar',
      data: {
       // spanGaps: false,
        labels: ['Q1(A)', 'Q2(A)', 'Q3(A)','Q4'],
      datasets : [
        {
       label: ' Offshore',
       data: [1.86, 1.69, 1.87, 2.19],
       backgroundColor: [
       'rgba(255, 99, 132, 0.6)',
       'rgba(255, 99, 132, 0.6)',
       'rgba(255, 99, 132, 0.6)',
       'rgba(255, 99, 132, 0.6)',
       /* 'rgba(255, 99, 132, 0.6)',
       'rgba(255, 99, 132, 0.6)',
       'rgba(255, 99, 132, 0.6)', */
      ],
      borderColor:[
        'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
     /*  'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)', */
     ],
      borderWidth: 2,
    },
    {
      label: ' Onsite',
      data: [0.1, 0.13, 0.18, 0.2],
      backgroundColor: [
      'rgba(54, 162, 235, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(54, 162, 235, 0.6)',],
     borderColor: [
     'rgba(54, 162, 235, 1)',
     'rgba(54, 162, 235, 1)',
     'rgba(54, 162, 235, 1)',
     'rgba(54, 162, 235, 1)',

     ],
     borderWidth: 2,
   }
]
      },
      options: {
        title: {
          text: 'Revenue(in $ Mn)',
          display: true
        },
        responsive : true,
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
                //stepSize: 5,

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

  }
}
