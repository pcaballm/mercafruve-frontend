import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

export interface Credenciales {
  nombreUsuario: string;
  password: string;
}

export interface CredencialesRegistro {
  nombre: string;
  apellidos: string;
  email: string;
  nombreUsuario: string;
  password: string;
  rol: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credenciales: Credenciales = {
    nombreUsuario: '',
    password: '',
  };

  credencialesRegistro: CredencialesRegistro = {
    nombre: '',
    apellidos: '',
    email: '',
    nombreUsuario: '',
    password: '',
    rol: '',
  };

  inicio: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    if (authService.getToken()) {
      this.router.navigate(['/']);
    }
  }

  login(form: NgForm) {
    console.log(form);
    this.authService
      .login(this.credenciales)
      .toPromise()
      .then((response) => {
        window.location.reload();
        this.router.navigate(['/']);
      });
  }
  cambiarRegistro() {
    this.inicio = !this.inicio;
  }
  registro() {
    this.authService
      .registro(this.credencialesRegistro)
      .toPromise()
      .then((response) => {
        window.location.reload();
        this.router.navigate(['/']);
      });
  }
}
