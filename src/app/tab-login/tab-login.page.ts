import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-tab-login',
  templateUrl: './tab-login.page.html',
  styleUrls: ['./tab-login.page.scss'],
  standalone: false
})

export class TabLoginPage {
  constructor(private router: Router, private authService: AuthService) { }

  userId: string = '';
  loginError = false;
  emptyInputError = false;

  login() {
    if (!this.userId || this.userId.trim() === '') {
      this.emptyInputError = true;
      this.loginError = false;
      return;
    }
  
    this.authService.checkIfIdExists(this.userId).then((exists: boolean) => {
      if (exists) {
        console.log('ID válido, se puede hacer login');

        // Guardar el ID en localStorage
        localStorage.setItem('userId', this.userId);
      
        this.loginError = false;
        this.emptyInputError = false;
        
        this.router.navigate(['/tabs']);
      } else {
        console.log('ID no encontrado, login no permitido');
        this.loginError = true;
        this.emptyInputError = false;
      }
    });
  }

  redirectToNewID() {
    window.location.href = 'https://onehealth-dowload.vercel.app';
  }

  checkDeviceID() {
    this.authService.checkIfDeviceExists().then((userId: string) => {
      if (userId=="0" || userId=="-1") {
        console.log('El dispositivo no esta registrado en la base de datos');
        this.loginError = true;
        this.emptyInputError = false;
      } else {
        console.log('El dispositivo corresponde al usuario: '+userId);
        this.userId = userId;
        this.login();
      }
    });
    }
}
