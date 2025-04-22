import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(private firebaseService: FirebaseService) {}

  dataAvailable: boolean = false;

  ///////// CARRUSEL DE GRÁFICAS ////////////////////////////////////

  // Variables para carrusel de gráficas
  graficaActual = 0;
  touchStartX = 0;
  touchEndX = 0;
  // Variable para mostrar componentes carrusel de gráficas
  carrusel_components_visibles: boolean = false;

  ngOnInit() {
    this.firebaseService.obtenerFormularioMasReciente(localStorage.getItem('userId') || '').then((data) => {
      if (data) {
        this.dataAvailable = true;
      } else {
        this.dataAvailable = false;
      }
    });
  }

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