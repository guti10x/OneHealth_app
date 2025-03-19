import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor() {}

  graficaActual = 0;
  touchStartX = 0;
  touchEndX = 0;

  // Al tocar la pantalla, guardamos la posición inicial
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  // Al levantar el dedo, vemos en qué dirección se movió
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.detectSwipe();
  }

  detectSwipe() {
    const diffX = this.touchEndX - this.touchStartX;

    if (diffX > 50) {
      this.prevSlide(); // Swipe a la derecha (ir a la anterior)
    } else if (diffX < -50) {
      this.nextSlide(); // Swipe a la izquierda (ir a la siguiente)
    }
  }

  // Función para ir a la gráfica anterior
  prevSlide() {
    this.graficaActual = (this.graficaActual - 1 + 2) % 2;
  }

  // Función para ir a la gráfica siguiente
  nextSlide() {
    this.graficaActual = (this.graficaActual + 1) % 2;
  }
}
