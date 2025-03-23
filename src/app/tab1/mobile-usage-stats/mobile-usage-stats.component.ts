import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-usage-stats',
  templateUrl: './mobile-usage-stats.component.html',
  styleUrls: ['./mobile-usage-stats.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class MobileUsageStatsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = false;

  // Tiempo total de uso del día
  totalUsageTime = '5 horas 34 minutos'; 
  // Variaciond del del tiempo de uso respecto al día anterior.
  usageChange = 15; 

  topApps = [
    { name: 'Mensajes', icon: 'chatbubbles', timeUsed: '1h 15m' },
    { name: 'Redes Sociales', icon: 'logo-facebook', timeUsed: '2h 45m' },
    { name: 'Navegador', icon: 'globe', timeUsed: '1h 10m' }
  ];

  // Número de desbloqueos de la pantalla
  unlockCount = 128; 
}
