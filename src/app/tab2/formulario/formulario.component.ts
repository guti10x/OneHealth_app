import { Component, OnInit, Input } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PickerController } from '@ionic/angular';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importamos el servicio de Firebase
import { FirebaseService } from 'src/services/firebase.service';

import { GeolocationService } from '../../../services/geolocation.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule, DragDropModule]
})

export class FormularioComponent implements OnInit {
  position: any;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  selectedNumber: number | null = 0;

  constructor(private pickerCtrl: PickerController,private firebaseService: FirebaseService,private geolocationService: GeolocationService) {}

  // Tipo formulario
  formType: string = 'formulario'; // formularioNoche | formularioMañana
  @Input() formMode: string = 'defaultForm'; // defaultForm | PendingForm

  // Variable para saber si el formulario se ha completado
  formularioCompleto: boolean = false;

  // Variables de error y validación
  formError: string = '';

  // Input inicializado
  formSubmitted: boolean = false;

  // Variable para mostrar el mensaje de información
  showInfoMessage = true;

  // Formulario 1
  wakeUpTime: Date | null = null;
  sleepTime: Date | null = null;
  restLevel: number | null = null;
  screenTime: number | null = null;
  unlocks: number | null = null;
  instagramTime: number | null = null;
  tiktokTime: number | null = null;
  topApps= ['Instagram', 'WhatsApp', 'TikTok', 'YouTube'];

  // Formulario 2
  timestamp: Date | null = null;
  avgAnxietyLevel: number | null = null;
  maxAnxietyLevel: number | null = null;
  sadnessLevel: number | null = null;
  happinessLevel: number | null = null;
  apathyLevel: number | null = null;
  avgEnergyLevel: number | null = null;

  ngOnInit(): void {
    // Llamar a la función para saber si el formulario corresponde al de día o de noche
    this.setFormTypeTime();
    this.getCurrentPosition();
  }

  //Método para obtener la geolocalizacion
  async getCurrentPosition() {
    try {
      this.position = await this.geolocationService.getCurrentPosition();
      console.log('Posición actual:', this.position);
      this.getGeocodeData(this.position.coords.latitude,this.position.coords.longitude);
    } catch (error) {
      console.error('Error al obtener la posición: ', error);
    }
  }

  getGeocodeData(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status !== 'error') {
                this.city = data.address.city;
                this.state = data.address.state;
                this.country = data.address.country;

                console.log(`Ciudad: ${this.city}, Comunidad: ${this.state}, País: ${this.country}`);
            } else {
                console.error('Error al obtener los datos de geocodificación:', data.message);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
  }

  // Método para definir si es de día o noche 
  setFormTypeTime() {
    const currentHour = new Date().getHours();
    
    if(this.formMode === 'defaultForm') {
      this.formType = currentHour >= 6 && currentHour < 19 ? 'formularioMañana' : 'formularioNoche';
    } else if (this.formMode === 'PendingForm') {
      this.formType = currentHour >= 6 && currentHour < 19 ? 'formularioNoche' : 'formularioMañana';
    } 

    console.log('Tipo de formulario:', this.formType);
  }

  async openNumberPicker(type: string) {
    const options = Array.from({ length: 21 }, (_, i) => ({
      text: i.toString(),
      value: i,
    }));
  
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'number',
          options,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (value) => {
            this.setValueByType(type, value.number.value);
          },
        },
      ],
    });
  
    await picker.present();
  }
  

  // Función para abrir el selector de fecha y hora
  async openTimePicker(field: string) {
    const now = new Date();
    const dates = [-1, 0, 1].map(offset => {
      const date = new Date(now);
      date.setDate(now.getDate() + offset);
      return {
        text: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
        value: date.toISOString().split('T')[0] // Formato YYYY-MM-DD
      };
    });

    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'day',
          options: dates
        },
        {
          name: 'hours',
          options: Array.from({ length: 24 }, (_, i) => ({
            text: i.toString().padStart(2, '0'),
            value: i
          }))
        },
        {
          name: 'minutes',
          options: [
            { text: '00', value: 0 },
            { text: '15', value: 15 },
            { text: '30', value: 30 },
            { text: '45', value: 45 }
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (value: any) => {
            const selectedDate = value.day.value;
            const formattedTime = `${selectedDate} ${value.hours.text}:${value.minutes.text}`;
            if (field === 'wakeUpTime') {
              this.wakeUpTime = new Date(formattedTime);
            } else {
              this.sleepTime = new Date(formattedTime);
            }
          }
        }
      ]
    });

    await picker.present();
  }

  // Función de validación
  validateForm() {
    // Limpiar errores previos
    this.formError = '';

    if (this.formType === 'formularioMañana') {
      // Validar si los valores no son nulos en formularioMañana
      if (this.wakeUpTime === null || this.sleepTime === null || this.restLevel === null) {
        this.formError = '❌ Error al enviar el formulario. Por favor, rellena todos los campos del formulario.';
        return false;
      }
    }

    if (this.formType === 'formularioNoche') {
      // Validar si los valores no son nulos en formularioNoche
      if (this.avgAnxietyLevel === null || this.maxAnxietyLevel === null || this.sadnessLevel === null ||
        this.happinessLevel === null || this.apathyLevel === null || this.avgEnergyLevel === null) {
          this.formError = '❌ Error al enviar el formulario. Por favor, rellena todos los campos del formulario.';
        return false;
      }
    }

    this.formSubmitted = true;
    // Si todo es válido
    return true;
  }

  // Función para enviar el formulario
  submitForm() {
    this.formSubmitted = true; // Establecemos que el formulario ha sido enviado

    if (this.validateForm()) {
      // Si el formulario es válido, continúa con el envío
      const userId = localStorage.getItem('userId');
      
      const now = new Date();
      const currentHour = now.getHours();

      let recordedAt: Date;

      if (this.formMode === 'PendingForm') {
        if (currentHour >= 6 && currentHour < 18) {
          // Hoy a las 5:55 AM
          recordedAt = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            5, 55, 0
          );
        } else {
          // Hoy a las 17:50
          recordedAt = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            17, 50, 0
          );
        }
      } else {
        recordedAt = now;
      }

      const datosFormulario: any = {
        id_user: userId,
        recorded_at: recordedAt,
      };

      // Agregar los campos al formulario si no son nulos
      if (this.city) datosFormulario.city = this.city;
      if (this.state) datosFormulario.state = this.state;
      if (this.country) datosFormulario.country = this.country;
      if (this.restLevel !== null) datosFormulario.rest_level = this.restLevel;
      if (this.sleepTime !== null && !isNaN(this.sleepTime.getTime())) datosFormulario.sleep_time = this.sleepTime;
      if (this.wakeUpTime !== null && !isNaN(this.wakeUpTime.getTime())) datosFormulario.wake_up_time = this.wakeUpTime;
      if (this.screenTime !== null) datosFormulario.screen_time = this.screenTime;
      if (this.unlocks !== null) datosFormulario.unlocks = this.unlocks;
      if (this.instagramTime !== null) datosFormulario.instagram_time = this.instagramTime;
      if (this.tiktokTime !== null) datosFormulario.tiktok_time = this.tiktokTime;
      if (this.topApps.length > 0) datosFormulario.final_ranking = this.topApps.join(',');
      if (this.avgAnxietyLevel !== null) datosFormulario.avgAnxietyLevel = this.avgAnxietyLevel;
      if (this.maxAnxietyLevel !== null) datosFormulario.maxAnxietyLevel = this.maxAnxietyLevel;
      if (this.sadnessLevel !== null) datosFormulario.sadnessLevel = this.sadnessLevel;
      if (this.happinessLevel !== null) datosFormulario.happinessLevel = this.happinessLevel;
      if (this.apathyLevel !== null) datosFormulario.apathyLevel = this.apathyLevel;
      if (this.avgEnergyLevel !== null) datosFormulario.avgEnergyLevel = this.avgEnergyLevel;
  
      console.log('Datos del formulario:', datosFormulario);
  
      this.firebaseService.guardarFormulario(datosFormulario)
        .then(() => {
          console.log("Datos guardados con éxito:", datosFormulario);
          this.formularioCompleto = true;
          this.formError = ''; 
        })
        .catch(error => {
          console.error("Error al guardar", error);
          this.formError = 'Hubo un problema al enviar el formulario. Por favor, intenta de nuevo.';
        });
    }
  }

  // Función para generar un ID del formulario
  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  numbersHours: number[] = Array.from({ length: 25 }, (_, i) => i);
  numberUnlocks: number[] = Array.from({ length: 100 }, (_, i) => i);

  selectedHour: number = 0;

  setValueByType(type: string, index: number) {
    let value = 0;
  
    if (type === 'screenTime' || type === 'instagramTime' || type === 'tiktokTime') {
      value = this.numbersHours[index] || 0;
    } else if (type === 'unlocks') {
      value = this.numberUnlocks[index] || 0;
    }
  
    (this as any)[type] = value;
  }

onScroll(event: any, type: string) {
  const scrollTop = event.target.scrollTop;
  const itemHeight = 40;

  const selectedIndex = Math.round(scrollTop / itemHeight);
  this.setValueByType(type, selectedIndex);
}
/*
  onScroll(event: any, type: string) {
    const scrollTop = event.target.scrollTop;
    const itemHeight = 40;
  
    const selectedIndex = Math.round(scrollTop / itemHeight);
  
    let value = 0;
    if (type === 'screenTime' || type === 'instagramTime' || type === 'tiktokTime') {
      value = this.numbersHours[selectedIndex] || 0;
    } else if (type === 'unlocks') {
      value = this.numberUnlocks[selectedIndex] || 0;
    }
  
    (this as any)[type] = value;
  }
*/
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.topApps, event.previousIndex, event.currentIndex);
    console.log('Nuevo orden:', this.topApps);
  }
}
