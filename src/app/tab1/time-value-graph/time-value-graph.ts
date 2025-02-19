import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-value-graph',
  standalone: true,
  templateUrl: './time-value-graph.html',
  styleUrls: ['./time-value-graph.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
})
export class TimeValueGraphComponent implements OnInit, AfterViewInit {
  @Input() graphTitle: string = 'Graph';
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  data: number[] = [12, 19, 3, 5, 2, 3];
  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  chart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (this.chart) {
      this.chart.destroy(); // Destruir gráfico anterior si existe
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Monthly Data',
          data: this.data,
          borderColor: '#red',
          backgroundColor: 'rgba(22, 8, 58, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: 'red',
          pointBorderColor: '#black',
          pointRadius: 5,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'black'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'black'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'black'
            }
          }
        }
      }
    });
  }
}
