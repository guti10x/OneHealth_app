import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/services/firebase.service';
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-anxiety-circle-level',
  templateUrl: './anxiety-circle-level.component.html',
  styleUrls: ['./anxiety-circle-level.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class AnxietyCircleLevelComponent  implements OnInit {

  constructor(private firebaseService : FirebaseService, private router: Router) {}

  // Predicción de ansiedad
  anxietyPrediction: number | null = null;
  energyLevel: number = 7;
  desganaLevel: number = 3;
  alegriaLevel: number = 6;
  tristezaLevel: number = 4;

  
  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = true;

  ngOnInit() {

    // Recargar datos del componte al ir al tab (por si se han añadido datos al dashware y mostrarlos)
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/tabs/tab1') {
        this.loadPredictData();
        // Recargar datos de emociones
        this.loadEmotionData();
        console.log("Recargando datos de estado emocional...");
      }
    });

    // Obtener prediciiones de Firebase
    this.loadPredictData();
    // Recargar datos de emociones
    this.loadEmotionData();
    

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

      console.log("Datos de predicción circulo:", data);
      this.anxietyPrediction =data['predicted_maxAnxietyLevel'];
      console.log("Predicción de ansiedad:", this.anxietyPrediction);
      if (this.anxietyPrediction !== null) {
        this.anxietyPrediction = Math.round(this.anxietyPrediction * 10) / 10;
        console.log("Predicción de ansiedad redondeada a un decimal:", this.anxietyPrediction);  
      }

      this.dataAvailable = true;
    });
  }

  loadEmotionData() {
    const userId = localStorage.getItem('userId') || '';
    console.log("User ID retrieved from localStorage:", userId);

    this.firebaseService.obtenerFormularioNocheMasReciente(userId).then(data => {
      if (!data) {
        console.error('No emotion form data found for user');
        this.dataAvailable = false;
        return;
      }

      console.log("Último formulario obtenido:", data);

      this.desganaLevel = data['apathyLevel'] ?? null;
      this.energyLevel = data['avgEnergyLevel'] ?? null;
      this.alegriaLevel = data['happinessLevel'] ?? null;
      this.tristezaLevel = data['sadnessLevel'] ?? null;

      this.dataAvailable = true;

      console.log("Valores extraídos:");
      console.log("Apatía:", this.desganaLevel);
      console.log("Energía Promedio:", this.energyLevel);
      console.log("Felicidad:", this.alegriaLevel);
      console.log("Tristeza:", this.tristezaLevel);
    });
  }

}
