import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';
import { Tab2Service } from './tab2.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page {

  constructor(private tab2Service : Tab2Service, private router: Router) {}

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
    this.checkPendingFormActual();

    // Verificar si el formulario pasado ha sido rellenado
    this.checkPendingFormPasado();

    // Recargar visibilidad de formularios al ir al tab (por si se ha completado algún formulario y mostrarlos o no)
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/tabs/tab2') {
        // Definir tipo de formulario a mostrar según la hora
        this.setFormTypeTime();
        // Verificar si el formulario actual ha sido rellenado
        this.checkPendingFormActual();
        // Verificar si el formulario pasado ha sido rellenado
        this.checkPendingFormPasado();
        console.log("Recargando formularios a rellenar...");
      }
    });
  }

  // Método para establecer el tipo de formulario según la hora actual
  setFormTypeTime() {
    const currentHour = new Date().getHours();
    this.formType = currentHour >= 6 && currentHour < 19 ? 'formularioMañana' : 'formularioNoche';
  }

  // Verificar si el formulario actual ha sido rellenado
  checkPendingFormActual() {
    this.tab2Service.verificarFormularioPendienteActual().then(result => {
      console.log("Formulario actual pendiente:", result);
      this.pendingFormActual = result;
    });
  }

  // Verificar si el formulario pasado ha sido rellenado
  checkPendingFormPasado() {
    this.tab2Service.verificarFormularioPendientePasado().then(result => {
      console.log("Formulario pasado pendiente:", result);
      this.pendingFormPasado = result;
    });
  }

  // Método para mostrar/ocultar formulario pendiente
  showPendingForm(){
    this.mostrarPendingForm = !this.mostrarPendingForm;
  }
  
}