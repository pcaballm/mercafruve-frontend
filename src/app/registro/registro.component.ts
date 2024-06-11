import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export interface Credenciales {
  nombre: string;
  apellidos: string;
  email: string;
  nombreUsuario: string;
  password: string;
  rol: string;
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  credenciales: Credenciales = {
    nombre: '',
    apellidos: '',
    email: '',
    nombreUsuario: '',
    password: '',
    rol: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  registro() {
    this.authService
      .registro(this.credenciales)
      .toPromise()
      .then((response) => {
        window.location.reload();
        this.router.navigate(['/']);
      });
  }
}
