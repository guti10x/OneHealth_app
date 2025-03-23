import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-daswahere',
  templateUrl: './header-daswahere.component.html',
  styleUrls: ['./header-daswahere.component.scss'],
  imports: [CommonModule]
})
export class HeaderDaswahereComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  // Variable para mostrar componente (si hay o no hay datos)
  dataAvailable: boolean = false;

}
