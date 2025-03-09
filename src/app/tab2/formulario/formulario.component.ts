import { Component, OnInit, Input } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private pickerCtrl: PickerController) {}

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

  submitForm() {
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
  }
}
