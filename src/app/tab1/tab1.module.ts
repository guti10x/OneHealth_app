import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Page
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';

// Components
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DreamSummaryComponent } from './dream-summary/dream-summary.component';
import { TimeValueGraphComponent } from './time-value-graph/time-value-graph';
import { MobileUsageStatsComponent } from "./mobile-usage-stats/mobile-usage-stats.component";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    DreamSummaryComponent,
    TimeValueGraphComponent,
    MobileUsageStatsComponent
],
  declarations: [
    Tab1Page
  ]
})
export class Tab1PageModule {}
