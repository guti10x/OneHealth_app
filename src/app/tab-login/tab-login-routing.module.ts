import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabLoginPage } from './tab-login.page';

const routes: Routes = [
  {
    path: '',
    component: TabLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabLoginPageRoutingModule {}
