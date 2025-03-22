import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-biometric-data-sumary',
  templateUrl: './biometric-data-sumary.component.html',
  styleUrls: ['./biometric-data-sumary.component.scss'],
  imports: [CommonModule]
})
export class BiometricDataSumaryComponent  implements OnInit {

  constructor() { }

  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = false;

  ngOnInit() {}

}
