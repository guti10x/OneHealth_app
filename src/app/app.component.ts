import { Component, inject, OnInit, PlatformRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';


import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { NotificationService } from '../services/notification.service';
import { initializeApp } from "firebase/app";
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})

export class AppComponent implements OnInit{
  
  private notificationService: NotificationService = inject(NotificationService);
  private plataform: Platform = inject(Platform); 
  private firestoreService: FirebaseService = inject(FirebaseService);

  
  constructor(private router: Router, private authService: AuthService) {}

  storedId = localStorage.getItem('userId');

  ngOnInit() {

    this.plataform.ready().then(()=>{
      this.notificationService.init();
      this.firestoreService.init();
    });

    const storedId = localStorage.getItem('userId');

    if (storedId) {
      this.authService.checkIfIdExists(storedId).then((exists: boolean) => {
        if (exists) {
          console.log('ID válido, redirigiendo a /tabs');
          this.router.navigate(['/tabs']);
        } else {
          console.log('ID no válido, redirigiendo a /login');
          localStorage.removeItem('userId'); // Eliminar ID inválido
          this.router.navigate(['/tab-login']);
        }
      });
    } else {
      console.log('No hay ID almacenado, redirigiendo a /tab-login');
      this.router.navigate(['/tab-login']);
    }
  }
}
