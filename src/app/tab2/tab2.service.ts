import { Injectable } from '@angular/core';
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
        const currentHour = now.getUTCHours();

        let fechaInicio: number;
        let fechaFin: number;

        if (currentHour >= 6 && currentHour < 19) {
          // Franja actual: 6:00 a 18:59
          const hoyManana = new Date();
          hoyManana.setUTCHours(6, 0, 0, 0);
          fechaInicio = hoyManana.getTime();

          const hoyTarde = new Date();
          hoyTarde.setUTCHours(19, 0, 0, 0);
          fechaFin = hoyTarde.getTime();
        } else {
          // Franja actual: 19:00 a 5:59
          const hoyTarde = new Date();
          hoyTarde.setUTCHours(19, 0, 0, 0);
          fechaInicio = hoyTarde.getTime();

          const mananaManana = new Date();
          mananaManana.setUTCDate(now.getUTCDate() + 1);
          mananaManana.setUTCHours(6, 0, 0, 0);
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
        const currentHour = now.getUTCHours();

        let fechaInicio: number;
        let fechaFin: number;

        if (currentHour >= 6 && currentHour < 19) {
          // Tramo anterior: 19:00 de ayer a 6:00 de hoy
          const ayerTarde = new Date();
          ayerTarde.setUTCDate(now.getUTCDate() - 1);
          ayerTarde.setUTCHours(19, 0, 0, 0);
          fechaInicio = ayerTarde.getTime();

          const hoyManana = new Date();
          hoyManana.setUTCHours(6, 0, 0, 0);
          fechaFin = hoyManana.getTime();
        } else {
          // Tramo anterior: 6:00 a 19:00 de hoy
          const hoyManana = new Date();
          hoyManana.setUTCHours(6, 0, 0, 0);
          fechaInicio = hoyManana.getTime();

          const hoyTarde = new Date();
          hoyTarde.setUTCHours(19, 0, 0, 0);
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
        resolve(formularios.length === 0);

      } catch (error) {
        console.error("Error en verificarFormularioPendientePasado:", error);
        reject(error);
      }
    });
  }
}