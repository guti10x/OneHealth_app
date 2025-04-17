import { Component, OnInit, Input } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importamos el servicio de Firebase
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule]
})

export class FormularioComponent implements OnInit {

  constructor(private pickerCtrl: PickerController, private firebaseService: FirebaseService) {}

  // Tipo formulario
  formType: string = 'formulario'; // formularioNoche | formularioMañana
  @Input() formMode: string = 'defaultForm'; // defaultForm | PendingForm

  // Variable para saber si el formulario se ha completado
  formularioCompleto: boolean = false;

  // Variables de error y validación
  formError: string = '';

  // Input inicializado
  formSubmitted: boolean = false;

  // Formulario 1
  wakeUpTime: Date | null = null;
  sleepTime: Date | null = null;
  restLevel: number | null = null;

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
  }

  // Método para definir si es de día o noche 
  setFormTypeTime() {
    const currentHour = new Date().getHours();
    
    if(this.formMode === 'defaultForm') {
      this.formType = currentHour >= 6 && currentHour < 18 ? 'formularioMañana' : 'formularioNoche';
    } else if (this.formMode === 'PendingForm') {
      this.formType = currentHour >= 6 && currentHour < 18 ? 'formularioNoche' : 'formularioMañana';
    } 

    console.log('Tipo de formulario:', this.formType);
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
        recorded_at: recordedAt
      };

      // Agregar los campos al formulario si no son nulos
      if (this.restLevel !== null) datosFormulario.rest_level = this.restLevel;
      if (this.sleepTime !== null && !isNaN(this.sleepTime.getTime())) datosFormulario.sleep_time = this.sleepTime;
      if (this.wakeUpTime !== null && !isNaN(this.wakeUpTime.getTime())) datosFormulario.wake_up_time = this.wakeUpTime;
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

}
