import { Injectable } from '@angular/core';
import { c } from '@angular/core/navigation_types.d-u4EOrrdZ';
import { FirebaseService } from 'src/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class Tab2Service {

  constructor(private firebaseService: FirebaseService) { }

  // Verificar si hay un formulario actual pendiente
  verificarFormularioPendienteActual(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const now = new Date();
        const currentHour = (now.getUTCHours() + 2) % 24;

        let fechaInicio: number;
        let fechaFin: number;

        console.log("Hora actual:", currentHour);

        if (currentHour >= 6 && currentHour < 19) {
          // Franja actual: 6:00 a 18:59 (hora local)
          const hoyManana = new Date(now);
          hoyManana.setUTCHours(4, 0, 0, 0); // 6:00 CEST = 4:00 UTC
          fechaInicio = hoyManana.getTime();
        
          const hoyTarde = new Date(now);
          hoyTarde.setUTCHours(17, 0, 0, 0); // 19:00 CEST = 17:00 UTC
          fechaFin = hoyTarde.getTime();
        } else {
          // Franja actual: 19:00 a 5:59 (hora local)
          const hoyTarde = new Date(now);
          hoyTarde.setUTCHours(17, 0, 0, 0); // 19:00 CEST = 17:00 UTC
          fechaInicio = hoyTarde.getTime();
        
          const mananaManana = new Date(now);
          mananaManana.setUTCDate(now.getUTCDate() + 1);
          mananaManana.setUTCHours(4, 0, 0, 0); // 6:00 CEST del día siguiente = 4:00 UTC
          fechaFin = mananaManana.getTime();
        }        

        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          console.error('No se encontró el userId en el localStorage.');
          resolve(true);
          return;
        }

        console.log("Buscando formulario ACTUAL entre:", new Date(fechaInicio).toUTCString(), "y", new Date(fechaFin).toUTCString());

        const formularios = await this.firebaseService.obtenerFormularios(fechaInicio, fechaFin, userId);
        console.log("Formulario encontrado Actual:", formularios);
        resolve(formularios.length === 0);

      } catch (error) {
        console.error("Error en verificarFormularioPendienteActual:", error);
        reject(error);
      }
    });
  }

  // Verificar si hay un formulario del pasado pendiente
  verificarFormularioPendientePasado(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const now = new Date();
        const currentHour = (now.getUTCHours() + 2) % 24;
  
        let fechaInicio: number;
        let fechaFin: number;
  
        if (currentHour >= 6 && currentHour < 19) {
          // Tramo anterior: 19:00 de ayer a 6:00 de hoy (en hora local)
          const ayerTarde = new Date(now);
          ayerTarde.setUTCDate(now.getUTCDate() - 1);
          ayerTarde.setUTCHours(17, 0, 0, 0); // 19:00 CEST = 17:00 UTC
          fechaInicio = ayerTarde.getTime();
  
          const hoyManana = new Date(now);
          hoyManana.setUTCHours(4, 0, 0, 0); // 6:00 CEST = 4:00 UTC
          fechaFin = hoyManana.getTime();
        } else {
          // Tramo anterior: 6:00 a 19:00 de hoy (en hora local)
          const hoyManana = new Date(now);
          hoyManana.setUTCHours(4, 0, 0, 0); // 6:00 CEST = 4:00 UTC
          fechaInicio = hoyManana.getTime();
  
          const hoyTarde = new Date(now);
          hoyTarde.setUTCHours(17, 0, 0, 0); // 19:00 CEST = 17:00 UTC
          fechaFin = hoyTarde.getTime();
        }
  
        const userId = localStorage.getItem('userId');
  
        if (!userId) {
          console.error('No se encontró el userId en el localStorage.');
          resolve(true);
          return;
        }
  
        console.log("Buscando formulario PASADO entre:", new Date(fechaInicio).toUTCString(), "y", new Date(fechaFin).toUTCString());
  
        const formularios = await this.firebaseService.obtenerFormularios(fechaInicio, fechaFin, userId);
        console.log("Formulario encontrado Pasado:", formularios);
        resolve(formularios.length === 0);
  
      } catch (error) {
        console.error("Error en verificarFormularioPendientePasado:", error);
        reject(error);
      }
    });
  }
  
}