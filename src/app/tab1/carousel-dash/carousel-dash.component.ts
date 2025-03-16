import { Component, OnInit } from '@angular/core';
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

  currentIndex = 0;

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambia cada 5 segundos
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }
}