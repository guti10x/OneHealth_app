import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-time-value-graph',
  standalone: true,
  templateUrl: './time-value-graph.html',
  styleUrls: ['./time-value-graph.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
})
export class TimeValueGraphComponent implements OnInit {
  @Input() graphTitle: string = 'Graph';
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = false;

  public predicciones: any[] = [];

  data: number[] = [];
  labels: string[] = [];
  chart: any;  

  constructor( private firebaseService: FirebaseService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    // Recargar datos del componte al ir al tab (por si se han añadido datos al dashware y mostrarlos)
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/tabs/tab1') {
        this.cargarPredicciones();
        console.log("Recargando gráfica...");
      }
    });
      this.cargarPredicciones();
  }

  async cargarPredicciones() {
  const userId = localStorage.getItem('userId') || '';
  this.predicciones = await this.firebaseService.obtenerTodasLasPredicciones(userId);
  console.log('2Predicciones obtenidas:', this.predicciones);

  this.dataAvailable = this.predicciones.length > 1;

  if (this.dataAvailable) {
    // Ordenar cronológicamente por fecha (de más antiguo a más nuevo)
    this.predicciones.sort((a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime());

    // Luego construir los labels y los datos
    this.labels = this.predicciones.map(p => new Date(p.recorded_at).toLocaleDateString('es-ES', {
      day: '2-digit', month: '2-digit'
    }));

    this.data = this.predicciones.map(p => p.predicted_maxAnxietyLevel);

    // Crear el gráfico (esperando que el DOM esté listo)
    setTimeout(() => {
      this.createChart();
    });
  }
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
            title: {
            display: true,
            text: 'Fecha',
            color: styles.getPropertyValue('--chart-tick-color').trim(),
            font: {
              size: 11, 
            }
          },
            ticks: {
              color: styles.getPropertyValue('--chart-tick-color').trim(),
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nivel de ansiedad',
              color: styles.getPropertyValue('--chart-tick-color').trim(),
              font: {
                size: 11,
              }
            },
            ticks: {
              color: styles.getPropertyValue('--chart-tick-color').trim()
            }
          }
        }
      }
    });
  } 
}