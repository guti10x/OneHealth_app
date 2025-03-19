import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dream-summary',
  templateUrl: './dream-summary.component.html',
  styleUrls: ['./dream-summary.component.scss'],
  imports: [IonicModule, CommonModule],
})

export class DreamSummaryComponent  implements OnInit {

  constructor() { }

  hoursOfSleep: number = 0;
  sleepQuality: string = '';
  timeSlept: string = '';
  time_sleep_diff: number = 19;

  ngOnInit() {
    this.loadSleepData();
  }

  loadSleepData() {
    this.hoursOfSleep = 8;
    this.sleepQuality = 'Good';  
    this.timeSlept = '10:30 PM - 6:30 AM';
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