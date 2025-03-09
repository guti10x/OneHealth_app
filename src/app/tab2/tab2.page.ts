import { Component, Inject } from '@angular/core';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page {

  // Inputs formulario
  wakeUpTime: string = '';
  sleepTime: string = '';
  restLevel: number = 5;
  constructor(@Inject(PickerController) private pickerCtrl: PickerController) {}

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

  // Función para mandar datos del formulario al back
  submitForm() {
    console.log('Formulario enviado con:', {
      wakeUpTime: this.wakeUpTime,
      sleepTime: this.sleepTime,
      restLevel: this.restLevel
    });
    alert('Formulario guardado correctamente.');
  }
}
