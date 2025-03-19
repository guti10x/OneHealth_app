import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor() {}

  graficaActual = 0;
  

  cambiarGrafica(direccion: number) {
    this.graficaActual = (this.graficaActual + direccion + 2) % 2;
  }

}
