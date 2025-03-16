import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-buenos-dias-noches',
  templateUrl: './header-buenos-dias-noches.component.html',
  styleUrls: ['./header-buenos-dias-noches.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class HeaderBuenosDiasNochesComponent  implements OnInit {

  constructor() { }

  @Input() isMorning: string = "k";

  ngOnInit() {}

}
