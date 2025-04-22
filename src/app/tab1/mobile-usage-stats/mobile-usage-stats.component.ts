import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-mobile-usage-stats',
  templateUrl: './mobile-usage-stats.component.html',
  styleUrls: ['./mobile-usage-stats.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class MobileUsageStatsComponent  implements OnInit {

  constructor(private firebaseService : FirebaseService) { }

    // Tiempo total de uso del día
    totalUsageTime = '5 horas 34 minutos'; 

    // Número de desbloqueos de la pantalla
    unlockCount = 128; 

    //Top aplicaciones más utilizadas
    topApps: any = null;

    // Lista de nombres de aplicaciones
    appNames: string[] = [];
    /*topApps = [
      { name: 'Mensajes', icon: 'chatbubbles', timeUsed: '1h 15m' },
      { name: 'Redes Sociales', icon: 'logo-facebook', timeUsed: '2h 45m' },
      { name: 'Navegador', icon: 'globe', timeUsed: '1h 10m' }
    ];*/
    
    // Variación del del tiempo de uso respecto al día anterior.
    usageChange = null; 

    // Variable para mostrar componente (si hay o no hay datos)
    dataAvailable: boolean = true;

  ngOnInit() {
    this.loadFormData();
  }

  getAppIcon(appName: string): string {
    const iconMap: { [key: string]: string } = {
      WhatsApp: 'logo-whatsapp',
      YouTube: 'logo-youtube',
      Instagram: 'logo-instagram',
      TikTok: 'logo-tiktok',
      Facebook: 'logo-facebook',
      Mensajes: 'chatbubbles',
      Navegador: 'globe',
    };
    return iconMap[appName] || 'apps';
  }
  
  loadFormData() {
    const userId = localStorage.getItem('userId');
  
    console.log(userId);
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }
  
    this.firebaseService.obtenerFormularioMasReciente(userId).then(data => {
      console.log("Datos de sueño:", data, userId);
      if (!data) {
        console.error('No sleep data found for user');
        this.dataAvailable = false;
        return;
      }
  
      // Procesar ranking y tiempo de pantalla
      this.appNames = data.final_ranking.split(',');
      this.totalUsageTime = data.screen_time;
      this.unlockCount = data.unlocks;
      console.log("Tiempo total de uso:", this.totalUsageTime, "Nombres de aplicaciones:", this.appNames);
  
      // Crear topApps con icono y valor vacío de tiempo
      this.topApps = this.appNames.slice(0, 3).map(app => ({
        name: app,
        icon: this.getAppIcon(app),
        timeUsed: '' // Puedes poner 'Desconocido' o '—' si lo prefieres
      }));
  
      this.dataAvailable = true;
  
    }).catch(error => {
      console.error('Error fetching sleep data:', error);
    });
  }
  
}
