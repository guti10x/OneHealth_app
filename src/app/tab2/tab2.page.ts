import { Component } from '@angular/core';

import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page {

  constructor(private firebaseService: FirebaseService) {}

  formType: string = '';

  // Variable para saber si hay un formulario pendiente
  pendingForm: boolean = true;

  // Variable para mostrar/ocultar formulario pendiente
  mostrarPendingForm: boolean = false;

  ngOnInit() {
    // Definir tipo de formulario a mostrar según la hora
    this.setFormTypeTime();

    // Verificar si hay un formulario pendiente
    this.verificarFormularioPendiente()
  }

  setFormTypeTime() {
    const currentHour = new Date().getHours();
    this.formType = currentHour >= 6 && currentHour < 17 ? 'formularioMañana' : 'formularioNoche';
  }

  showPendingForm(){
    this.mostrarPendingForm = !this.mostrarPendingForm;
  }

  verificarFormularioPendiente() {
    const now = new Date();
    const currentHour = now.getUTCHours(); // 🔹 Usar UTC
    
    let fechaInicio: number;
    let fechaFin: number;
    
    // Si estamos en el tramo de 6:00 (hoy) - 18:59 (hoy)
    if (currentHour >= 6 && currentHour < 19) {
      // Buscar formularios de 19:00 (ayer) del día anterior a 6:00 (hoy) del día actual -> formulario de noche
      const ayerTarde = new Date();
      ayerTarde.setUTCDate(now.getUTCDate() - 1);
      ayerTarde.setUTCHours(19, 0, 0, 0);
      fechaInicio = ayerTarde.getTime();
  
      const hoyManana = new Date();
      hoyManana.setUTCHours(6, 0, 0, 0);
      fechaFin = hoyManana.getTime();
    } 
    // Si estamos en el tramo de 19:00 (ayer) - 5:59 (hoy)
    else {
      // Buscar formularios de 6:00 (hoy) - 19:00 (hoy) -> formulario mañana
      const hoyManana = new Date();
      hoyManana.setUTCHours(6, 0, 0, 0);
      fechaInicio = hoyManana.getTime();
  
      const hoyTarde = new Date();
      hoyTarde.setUTCHours(19, 0, 0, 0);
      fechaFin = hoyTarde.getTime();
    }
  
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log("Buscar formularios entre", new Date(fechaInicio).toUTCString(), "y", new Date(fechaFin).toUTCString());
      
      // Llamada al servicio correctamente estructurada
      this.firebaseService.obtenerFormularios(fechaInicio, fechaFin)
        .then(formularios => {
          this.pendingForm = formularios.length > 0;
        })
        .catch(error => {
          console.error("Error al obtener formularios:", error);
        });
  
    } else {
      console.error('No se encontró el userId en el localStorage.');
    }
  }
  
}