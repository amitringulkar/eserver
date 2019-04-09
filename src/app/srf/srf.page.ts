import { Component, OnInit , ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import { Router } from '@angular/router';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-srf',
  templateUrl: './srf.page.html',
  styleUrls: ['./srf.page.scss'],
})
export class SrfPage implements OnInit {

  constructor( private router: Router) { }
  DoughnutChart: any = [];
  @ViewChild('slider') slider: IonSlides ;
  page = '0';
  selectedTab(ind: number) {
    console.log('selected tab : ' + ind);
    this.slider.slideTo(ind);
  }
  segmentChanged($event) {
    this.slider.getActiveIndex().then( activePage => {
      $event = activePage.toString();
      this.page = $event;
    });
  }

  ngOnInit() {
   // Pie CHART for Page 1
   this.DoughnutChart = new Chart('overall', {
    type: 'doughnut',
    data: {
       labels: ['Cancelled', 'Open' , 'Closed'],
      datasets : [{
        label : 'Number of Colors ',
        data: [77, 31, 137],
        fill : true,
        lineTension : 1.7,
        borderColor : 'white',
        borderWidth : 4,
       // backgroundColor : ['#ff6384', '#36a2eb' , '#cc65fe'] ,
       backgroundColor : [
          'rgba(222, 240, 255)',
          'rgba(167, 212, 248)',
          'rgba(38, 153, 251)'
          
      ] ,
        hoverBorderWidth : 3
      }]
    },

      title: {
        text: 'ADS-SRF',
        display : true
      },
     
      devicePixelRatio: window.devicePixelRatio	,
      responsive: true,
      cutoutPercentage : 50,
      circumference : 2 * Math.PI
    
    
  });

  // Pie CHART for Page 2
  this.DoughnutChart = new Chart('open', {
    type: 'doughnut',
    data: {
       labels: [ 'Active' , 'Offered'],
      datasets : [{
        // label : 'Number of Colors ',
        data: [31, 0],
        fill : true,
        lineTension : 1.7,
        borderWidth : 4,
        backgroundColor : [
          'rgba(222, 240, 255)',
          'rgba(167, 212, 248)',
          'rgba(38, 153, 251)'
          
      ] ,
        borderColor: ['#fff'],
        hoverBorderWidth : 3
      }]
    },
    options: {
      title: {
        text: 'Open SRFs',
        display : true
      },
      devicePixelRatio: window.devicePixelRatio	,
      responsive: true,
      cutoutPercentage : 50,
      circumference : 2 * Math.PI
    },
    tooltips: {
      enabled: false
 },
       
  });

  // Pie CHART for Page 3
  this.DoughnutChart = new Chart('active', {
    type: 'doughnut',
    data: {
       labels: [ '0 - 2 weeks', '2 - 4 weeks', ' > 4 weeks' ],
      datasets : [{
        // label : 'Number of Colors ',
        data: [22, 8, 1],
        fill : true,
        lineTension : 1.7,
        borderWidth : 4,
        backgroundColor : [
          'rgba(222, 240, 255 )',
          'rgba(167, 212, 248 )',
          'rgba(38, 153, 251 )'
          
      ] ,
        borderColor: ['#fff'],
        hoverBorderWidth : 3
      }]
    },
    options: option
  });

  var option = { 
    title: {
      text: 'Active SRF Age',
      display : true
    },
    devicePixelRatio: window.devicePixelRatio	,
    responsive: true,
    cutoutPercentage : 50,
    circumference : 2 * Math.PI
  }

  Chart.plugins.register({
    afterDatasetsDraw: function(chartInstance, easing) {
      // To only draw at the end of animation, check for easing === 1
      var ctx = chartInstance.chart.ctx;
      chartInstance.data.datasets.forEach(function(dataset, i) {
        var meta = chartInstance.getDatasetMeta(i);
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            // Draw the text in black, with the specified font
            ctx.fillStyle = 'black';
            var fontSize = 16;
            var fontStyle = 'normal';
            var fontFamily = 'Helvetica Neue';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
            // Just naively convert to string for now
            var dataString = dataset.data[index].toString();
            // Make sure alignment settings are correct
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var padding = 5;
            var position = element.tooltipPosition();
            ctx.fillText(dataString , position.x, position.y - (fontSize / 2) - padding);
          });
        }
      });
    }
  });

  }
}
