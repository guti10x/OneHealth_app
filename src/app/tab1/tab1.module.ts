import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Page
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';

// Components
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HeaderDaswahereComponent } from './header-daswahere/header-daswahere.component';
import { DreamSummaryComponent } from './dream-summary/dream-summary.component';
import { TimeValueGraphComponent } from './time-value-graph/time-value-graph';
import { MobileUsageStatsComponent } from "./mobile-usage-stats/mobile-usage-stats.component";
import { CarouselDashComponent } from './carousel-dash/carousel-dash.component';
import { BiometricDataSumaryComponent } from './biometric-data-sumary/biometric-data-sumary.component';
import { HeaderBuenosDiasNochesComponent } from "../tab2/header-buenos-dias-noches/header-buenos-dias-noches.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HeaderDaswahereComponent,
    Tab1PageRoutingModule,
    DreamSummaryComponent,
    TimeValueGraphComponent,
    MobileUsageStatsComponent,
    CarouselDashComponent,
    BiometricDataSumaryComponent,
    HeaderBuenosDiasNochesComponent
],
  declarations: [
    Tab1Page
  ]
})
export class Tab1PageModule {}
