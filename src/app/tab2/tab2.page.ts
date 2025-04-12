import { Component } from '@angular/core';
import { Tab2Service } from './tab2.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page {

  constructor(private tab2Service : Tab2Service) {}

  // Tipo de formulario a mostrar
  formType: string = '';

  // Variable para saber si hay un formulario pendiente
  pendingFormActual: boolean = true;
  pendingFormPasado: boolean = true;

  // Variable para mostrar/ocultar formulario pendiente
  mostrarPendingForm: boolean = false;

  ngOnInit() {

    // Definir tipo de formulario a mostrar según la hora
    this.setFormTypeTime();

    // Verificar si el formulario actual ha sido rellenado
    this.tab2Service.verificarFormularioPendienteActual().then(result => {
      console.log("Formulario actual pendiente:", result);
      this.pendingFormActual = result;
    });

    // Verificar si el formulario pasado ha sido rellenado
    this.tab2Service.verificarFormularioPendientePasado().then(result => {
      console.log("Formulario pasado pendiente:", result);
      this.pendingFormPasado = result;
    });
  }

  // Método para establecer el tipo de formulario según la hora actual
  setFormTypeTime() {
    const currentHour = new Date().getHours();
    this.formType = currentHour >= 6 && currentHour < 17 ? 'formularioMañana' : 'formularioNoche';
  }

  // Método para mostrar/ocultar formulario pendiente
  showPendingForm(){
    this.mostrarPendingForm = !this.mostrarPendingForm;
  }
  
}