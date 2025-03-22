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

  data: number[] = [0, 20, 30, 50, 60, 70, 100];
  labels: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  chart: any;

  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = true;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const styles = getComputedStyle(document.documentElement);
  
    if (this.chart) {
      this.chart.destroy(); // Destruir gráfico anterior si existe
    }
  
    this.chart = new Chart(ctx, {
      data: {
        labels: this.labels,
        datasets: [{
          type: 'line',
          label: '', // Eliminamos el texto de la leyenda
          data: this.data,
          borderColor: styles.getPropertyValue('--chart-border-color').trim(),
          backgroundColor: styles.getPropertyValue('--chart-bg-color').trim(),
          borderWidth: 2,
          pointBackgroundColor: styles.getPropertyValue('--chart-point-bg-color').trim(),
          pointBorderColor: styles.getPropertyValue('--chart-point-border-color').trim(),
          pointRadius: 5,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Eliminamos la leyenda completamente
          }
        },
        scales: {
          x: {
            ticks: {
              color: styles.getPropertyValue('--chart-tick-color').trim()
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: styles.getPropertyValue('--chart-tick-color').trim()
            }
          }
        }
      }
    });
  } 
}