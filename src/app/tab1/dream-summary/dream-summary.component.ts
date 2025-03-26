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

  sleep_time: Date | null = null; formattedSleepTime: string = '';
  wake_up_time: Date | null = null; formattedWakeUpTime: string = '';
  timeSlept: string = '';
  sleepQuality: number | null = null;
  time_sleep_diff: number = 19;

  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = true;

  ngOnInit() {
    this.loadSleepData();

    this.firebaseService.buscarFormularioDiaAnterior("xk0vkwrik")
  }

  // Función para obtener los datos de sueño
  loadSleepData() {
    const userId = localStorage.getItem('userId');
    //const userId = "xk0vkwrik";
    
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

      // Calidad del sueño
      this.sleepQuality = data.rest_level;

      // Rango de sueño
      this.sleep_time = data.sleep_time.toDate();
      this.wake_up_time = data.wake_up_time.toDate();
     
      this.formattedSleepTime = this.formatTime(data.sleep_time);
      this.formattedWakeUpTime = this.formatTime(data.wake_up_time);
      
      // Tiempo dormido
      this.timeSlept = this.calculateSleepDuration(data.sleep_time, data.wake_up_time);

      // Diferencia de tiempo de sueño respecto

    }).catch(error => {
      console.error('Error fetching sleep data:', error);
    });
  }

  // Formatear timestamps a hora + am/pm
  formatTime(timestamp: any): string {
    if (!timestamp) return '';
  
    const date = timestamp.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
  
    // Convertir a formato 12 horas
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  }
  
  // Calcular duración del sueño
  calculateSleepDuration(sleepTimestamp: any, wakeTimestamp: any): string {
    if (!sleepTimestamp || !wakeTimestamp) return '';
  
    const sleepTime = sleepTimestamp.toDate();
    const wakeTime = wakeTimestamp.toDate();
  
    let diffMs = wakeTime.getTime() - sleepTime.getTime();
  
    // Si el usuario se durmió un día y despertó al día siguiente -> sumar 24 horas
    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000;
    }
  
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${hours}h ${minutes}m`;
  }

  getSleepQualityClass(quality: number): string {
    if (quality >= 8) {
      return 'good-sleep';
    } else if (quality >= 5) {
      return 'medium-sleep';
    } else if (quality >= 0) {
      return 'bad-sleep';
    } else {
      return 'medium-sleep'; // Por defecto
    }
  }
  
  getSleepQualityIcon(quality: number): string {
    if (quality >= 8) {
      return 'happy';
    } else if (quality >= 5) {
      return 'alert';
    } else if (quality >= 0) {
      return 'sad';
    } else {
      return 'help-circle';
    }
  }

}