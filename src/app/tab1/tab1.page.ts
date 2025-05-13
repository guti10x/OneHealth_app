import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  dataAvailable: boolean = false;

  ///////// CARRUSEL DE GRÁFICAS ////////////////////////////////////

  // Variables para carrusel de gráficas
  graficaActual = 0;
  touchStartX = 0;
  touchEndX = 0;

  ngOnInit() {
    // Verificar si hay datos a mostrar en el dashwere o mostrar mensaje de no hay datos
    this.isDataAvailable();

    // Recargar visibilidad de dashwere al ir al tab (por si se ha completado algún formulario y mostrarlos o no)
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/tabs/tab1') {
        // Verificar si hay datos a mostrar en el dashwere o mostrar mensaje de no hay datos
        this.isDataAvailable();
      }
    });
  }

  // Verificar si hay datos a mostrar en el dashwere o mostrar mensaje de no hay datos
  isDataAvailable() {
    Promise.all([
      this.firebaseService.obtenerFormularioMañanaMasReciente(localStorage.getItem('userId') || ''),
      this.firebaseService.obtenerFormularioNocheMasReciente(localStorage.getItem('userId') || '')
    ]).then(([dataMañana, dataNoche]) => {
      this.dataAvailable = !!(dataMañana || dataNoche);
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