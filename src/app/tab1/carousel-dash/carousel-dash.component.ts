import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/services/firebase.service';
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-carousel-dash',
  templateUrl: './carousel-dash.component.html',
  styleUrls: ['./carousel-dash.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class CarouselDashComponent  implements OnInit {

  constructor(private firebaseService : FirebaseService, private router: Router) {}

  items: { title: string; content: string }[] = [];

  anxietyPrediction: number | null = null;

  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = true;

  // Índice del slide actual del carrusel
  currentIndex = 0;

  ngOnInit() {

    // Recargar datos del componte al ir al tab (por si se han añadido datos al dashware y mostrarlos)
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/tabs/tab1') {
        this.loadPredictData();
        console.log("Recargando datos de sueño...");
      }
    });

    // Obtener prediciiones de Firebase
    this.loadPredictData();
    
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambio cada 3 segundos
  }

loadPredictData() {
  const userId = localStorage.getItem('userId') || '';
  console.log("User ID retrieved from localStorage:", userId);

  this.firebaseService.obtenerUltimaPrediccion(userId).then(data => {
    if (!data) {
      console.error('No prediction data found for user');
      this.dataAvailable = false;
      return;
    }

    console.log("Datos de predicción:", data);
    this.anxietyPrediction = data['anxiety_prediction'];
    this.dataAvailable = true;

    // Llamada a la función que genera los mensajes y asignación
    this.items = this.getAnxietyMessages(this.anxietyPrediction ?? 0, 2);
  });
}

getAnxietyMessages(prediction: number, count: number = 2): { title: string; content: string }[] {
  const messages = {
  bajo: [
    { title: '🧘 Estado de calma', content: 'Tu nivel de ansiedad es bajo. Sigue con esos buenos hábitos.' },
    { title: '💤 Descanso equilibrado', content: 'Estás durmiendo bien y manteniendo una buena rutina.' },
    { title: '✅ Bienestar emocional', content: 'Tu estado mental está estable. ¡Sigue así!' }
  ],
  medio: [
    { title: '📈 Ansiedad en aumento', content: 'Tu ansiedad está en un nivel moderado. Conviene estar atento a cómo evoluciona.' },
    { title: '💡 Pausas conscientes', content: 'Haz pequeños descansos a lo largo del día para respirar y relajarte.' },
    { title: '😌 Espacio para mejorar', content: 'No es preocupante, pero puedes tomar medidas para sentirte mejor.' }
  ],
  alto: [
    { title: '⚠️ Nivel alto de ansiedad', content: 'Se ha detectado una ansiedad elevada. No ignores lo que sientes.' },
    { title: '🚨 Cuida tu bienestar', content: 'Es momento de parar, respirar y priorizar tu salud mental.' },
    { title: '🧠 Pide apoyo si lo necesitas', content: 'Hablar con alguien de confianza o un profesional puede ayudarte mucho.' }
  ]
};

  const rango = prediction < 4 ? 'bajo' : prediction < 7 ? 'medio' : 'alto';
  return messages[rango].sort(() => Math.random() - 0.5).slice(0, count);
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