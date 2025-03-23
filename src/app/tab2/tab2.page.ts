import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page {

  formType: string = '';

  constructor() {}

  ngOnInit() {
    this.setFormTypeTime();
  }

  setFormTypeTime() {
    const currentHour = new Date().getHours();
    this.formType = currentHour >= 6 && currentHour < 18 ? 'formularioMañana' : 'formularioNoche';
  }

}