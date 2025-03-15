import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FormularioComponent } from './formulario/formulario.component';
import { HeaderBuenosDiasNochesComponent } from './header-buenos-dias-noches/header-buenos-dias-noches.component';

import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    FormularioComponent,
    HeaderBuenosDiasNochesComponent
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
