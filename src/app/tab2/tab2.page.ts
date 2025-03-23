import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page {

  constructor() {}

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
    this.formType = currentHour >= 6 && currentHour < 18 ? 'formularioMañana' : 'formularioNoche';
  }

  showPendingForm(){
    this.mostrarPendingForm = !this.mostrarPendingForm;
  }

  verificarFormularioPendiente() {
    const now = new Date();
    const currentHour = now.getUTCHours(); // 🔹 Usar UTC
  
    let fechaInicio: number;
    let fechaFin: number;

    // Si estamos en el tramo "formulario mañana" (6:00 - 18:00) → Buscamos formularios del día anterior entre las 18:00 y las 6:00 de hoy.
    if (currentHour >= 6 && currentHour < 18) {
      // Buscar entre 6:00 UTC y 18:00 UTC de ayer
      const ayerManana = new Date();
      ayerManana.setUTCDate(now.getUTCDate() - 1);
      ayerManana.setUTCHours(6, 0, 0, 0);
      fechaInicio = ayerManana.getTime();
  
      const ayerTarde = new Date();
      ayerTarde.setUTCDate(now.getUTCDate() - 1);
      ayerTarde.setUTCHours(18, 0, 0, 0);
      fechaFin = ayerTarde.getTime();

    // Si estamos en el tramo "formulario noche" (18:00 - 6:00) → Buscamos formularios del día anterior entre las 6:00 y las 18:00.
    } else {
      // Buscar entre 18:00 UTC de ayer y 6:00 UTC de hoy
      const ayer = new Date();
      ayer.setUTCDate(now.getUTCDate() - 1);
      ayer.setUTCHours(18, 0, 0, 0);
      fechaInicio = ayer.getTime();
  
      const hoy = new Date();
      hoy.setUTCHours(6, 0, 0, 0);
      fechaFin = hoy.getTime();
    }
  
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log("Buscar formularios entre", new Date(fechaInicio).toLocaleString(), "y", new Date(fechaFin).toLocaleString());
      // Servicio pendiente para consultas
      this.pendingForm = true;
    } else {
      console.error('No se encontró el userId en el localStorage.');
    }
  }
}