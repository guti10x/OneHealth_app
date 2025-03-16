import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-carousel-dash',
  templateUrl: './carousel-dash.component.html',
  styleUrls: ['./carousel-dash.component.scss'],
  imports: [IonicModule],
})
export class CarouselDashComponent  implements OnInit {

    items = [
    { title: '🔔 Notificación', content: 'Tienes una nueva alerta importante.' },
    { title: '📊 Predicción', content: 'Se espera un aumento del uso en un 15% esta semana.' },
    { title: '💡 Recomendación', content: 'Prueba reducir el tiempo en redes sociales antes de dormir.' }
  ];

  @Input() tipoCarrusel!: string;

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