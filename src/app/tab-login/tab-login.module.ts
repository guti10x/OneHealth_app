import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabLoginPageRoutingModule } from './tab-login-routing.module';

import { TabLoginPage } from './tab-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabLoginPageRoutingModule
  ],
  declarations: [TabLoginPage]
})
export class TabLoginPageModule {}
