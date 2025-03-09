import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [IonicModule, FormsModule]
})
export class FormularioComponent implements OnInit {
  // Variables para almacenar los datos del formulario
  wakeUpTime: string = '';
  sleepTime: string = '';
  restLevel: number = 5;

  constructor(private pickerCtrl: PickerController) {}

  ngOnInit(): void {
    // Aquí puedes poner cualquier lógica adicional de inicialización si es necesario.
  }

  // Función para abrir selector de horas y minutos
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

  // Función para enviar datos del formulario al backend (por ejemplo)
  submitForm() {
    console.log('Formulario enviado con:', {
      wakeUpTime: this.wakeUpTime,
      sleepTime: this.sleepTime,
      restLevel: this.restLevel
    });
    alert('Formulario guardado correctamente.');
  }
}
