import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({ projectId: "onehealth-f4967", appId: "1:715509358269:web:7763ceab237d5af540a1d4", storageBucket: "onehealth-f4967.firebasestorage.app", apiKey: "AIzaSyCvFyLxj6YhxA0X2HrUzmeZp3wq27CRmVI", authDomain: "onehealth-f4967.firebaseapp.com", messagingSenderId: "715509358269", measurementId: "G-B9XRJX79KH" })), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
