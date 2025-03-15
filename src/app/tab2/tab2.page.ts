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
  // Variable para saber si es de día o noche para mostrar header de Buenos días / noches
  isMorning: boolean = true;


  ngOnInit() {
    this.setFormTypeTime();
  }
  
  // Método para definir si es de día o noche 
  setFormTypeTime() {
    const currentHour = new Date().getHours();
    this.isMorning = currentHour >= 6 && currentHour < 20; // Mañana: 6am-20pm | Noche: 20pm-6am
    this.formularioType = this.isMorning ? 'formularioMañana' : 'formularioNoche';
  }
}