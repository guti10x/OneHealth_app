import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-dream-summary',
  templateUrl: './dream-summary.component.html',
  styleUrls: ['./dream-summary.component.scss'],
  imports: [IonicModule, CommonModule],
})

export class DreamSummaryComponent  implements OnInit {

  constructor(private firebaseService : FirebaseService) { }

  hoursOfSleep: number = 0;
  sleepQuality: string = '';
  timeSlept: string = '';
  time_sleep_diff: number = 19;

  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = true;

  ngOnInit() {
    this.loadSleepData();
  }

  // Función para obtener los datos de sueño
  loadSleepData() {
    // const userId = localStorage.getItem('userId'); // Si prefieres obtenerlo del localStorage
    const userId = "xk0vkwrik"; // ID de usuario de prueba
    
    console.log(userId);
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }
  
    this.firebaseService.obtenerFormularioMasReciente(userId).then(data => {
      if (!data) {
        console.error('No sleep data found for user');
        return;
      }
  
    }).catch(error => {
      console.error('Error fetching sleep data:', error);
    });
  }

  getSleepQualityClass(quality: string): string {
    switch (quality.toLowerCase()) {
      case 'good':
        return 'good-sleep';
      case 'medium':
        return 'medium-sleep';
      case 'bad':
        return 'bad-sleep';
      default:
        return 'medium-sleep'; // Por defecto
    }
  }
  
  getSleepQualityIcon(quality: string): string {
    switch (quality.toLowerCase()) {
      case 'good':
        return 'happy';
      case 'medium':
        return 'alert';
      case 'bad':
        return 'sad';
      default:
        return 'help-circle';
    }
  }

}