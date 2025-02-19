import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dream-summary',
  templateUrl: './dream-summary.component.html',
  styleUrls: ['./dream-summary.component.scss'],
  imports: [IonicModule],
})
export class DreamSummaryComponent  implements OnInit {

  constructor() { }

  hoursOfSleep: number = 0;
  sleepQuality: string = '';
  timeSlept: string = '';

  ngOnInit() {
    this.loadSleepData();
  }

  
  loadSleepData() {
    // Datos estáticos para demostración, puedes modificar esto
    this.hoursOfSleep = 8;
    this.sleepQuality = 'Good';  // Puedes modificar el valor según tus necesidades
    this.timeSlept = '10:30 PM - 6:30 AM';  // Tiempo en el que se durmió
  }


  

}
