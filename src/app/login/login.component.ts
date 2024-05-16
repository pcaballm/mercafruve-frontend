import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

export interface Credenciales {
  nombreUsuario: string;
  password: string;
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

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm) {
    console.log(form);
    this.authService.login(this.credenciales).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }
}
