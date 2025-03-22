import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page {

  // Tipo formulario
  formularioType: string = 'formulario'; // formularioNoche | formularioMañana

  // Variable para saber si el formulario se ha completado
  formularioCompleto: boolean = false;

  ngOnInit() {
    this.setFormTypeTime();
  }
  
  // Método para definir si es de día o noche 
  setFormTypeTime() {
    const currentHour = new Date().getHours();
    this.formularioType = currentHour >= 6 && currentHour < 18 ? 'formularioMañana' : 'formularioNoche';
  }

  // Método para saber si el formulario se ha completado
  formCompleted() {
    // llamada al servicio de la BD para saber si el formulario se ha completado en el timestamp del dia de hoy en el rango de tiempo del formualrio
  }
}