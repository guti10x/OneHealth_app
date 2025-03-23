import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})

export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}

  storedId = localStorage.getItem('userId');

  ngOnInit() {

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
