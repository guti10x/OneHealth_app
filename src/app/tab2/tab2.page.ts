import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page {
  formularioType: string = 'formulario'; // formularioNoche | formularioMañana

  ngOnInit() {
    // DEFINIR TIPO DE FORMULARIO
    this.formularioType = 'formularioMañana';
  }

}