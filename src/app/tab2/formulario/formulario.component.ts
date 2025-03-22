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
  @Input() formType: string = ''; // Recibe el tipo de formulario (mañana o noche)

  // Formulario 1: Solo horas y descanso
  wakeUpTime: string = '';
  sleepTime: string = '';
  restLevel: number = 5; // Grado de descanso

  // Formulario 2: Datos emocionales y de energía
  timestamp: string = ''; // Marca de tiempo
  avgAnxietyLevel: number = 5;
  maxAnxietyLevel: number = 5;
  sadnessLevel: number = 5;
  happinessLevel: number = 5;
  apathyLevel: number = 5;
  avgEnergyLevel: number = 5;

  constructor(private pickerCtrl: PickerController, private firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  // Función para abrir el selector de horas y minutos
  async openTimePicker(field: string) {
    const picker = await this.pickerCtrl.create({
      columns: [
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
            const formattedTime = `${value.hours.text}:${value.minutes.text}`;
            if (field === 'wakeUpTime') {
              this.wakeUpTime = formattedTime;
            } else {
              this.sleepTime = formattedTime;
            }
          }
        }
      ]
    });

    await picker.present();
  }

  /*submitForm() {
    console.log('Formulario enviado con:', {
      wakeUpTime: this.wakeUpTime,
      sleepTime: this.sleepTime,
      restLevel: this.restLevel,
      timestamp: this.timestamp,
      avgAnxietyLevel: this.avgAnxietyLevel,
      maxAnxietyLevel: this.maxAnxietyLevel,
      sadnessLevel: this.sadnessLevel,
      happinessLevel: this.happinessLevel,
      apathyLevel: this.apathyLevel,
      avgEnergyLevel: this.avgEnergyLevel
    });
    alert('Formulario guardado correctamente.');
  }*/

  submitFormMorning() {
    const datosFormulario = {
      id_mor_form: this.generateUniqueId(),
      id_user: "testtttt2994e505-c82e-407f-97a0-86399687f652", // HAY que ver como obtengo el id del usuario
      recorded_at: new Date(),
      rest_level: this.restLevel,
      sleep_time: this.sleepTime,  // HAY que ver como gestionar dia y hora
      wake_up_time: this.wakeUpTime,  // HAY que ver como gestionar dia y hora
    };

    console.log('Datos del formulario:', datosFormulario);
  
    this.firebaseService.guardarFormulario(datosFormulario)
      .then(() => {
        console.log("Datos guardados con éxito:", datosFormulario);
      })
      .catch(error => console.error("Error al guardar", error));
  }

  // Función para generar un ID del formulario
  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
