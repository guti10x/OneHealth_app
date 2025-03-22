import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-dash',
  templateUrl: './carousel-dash.component.html',
  styleUrls: ['./carousel-dash.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class CarouselDashComponent  implements OnInit {

  items = [
    { title: '📊 Anomalías detectadas', content: 'Se espera un aumento del uso en un 15% esta semana.'},
    { title: '💡 Recomendación del día', content: 'Prueba reducir el tiempo en redes sociales antes de dormir.'}
  ];

  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = false;

  // Índice del slide actual del carrusel
  currentIndex = 0;
  

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambia cada 3 segundos
  }

  // Avanza al siguiente slide del carrusel
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  // Retrocede al slide anterior del carrusel
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }
}