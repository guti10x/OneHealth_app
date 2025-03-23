import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Redirigimos al login por defecto
  {
    path: '', 
    redirectTo: 'tab-login',  
    pathMatch: 'full'
  },
  // Rutas Login
  {	
    path: 'tab-login',
    loadChildren: () => import('./tab-login/tab-login.module').then(m => m.TabLoginPageModule)
  },
  // Rutas Tabs
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
