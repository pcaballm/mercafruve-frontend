import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class BarraNavegacionComponent implements OnInit, OnDestroy {
  token: any;
  constructor(private router: Router, private authService: AuthService) {
    this.token = this.authService.getToken();
  }
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  navegarProductos() {
    this.router.navigate(['/']);
  }
  navegarSubastas() {
    this.router.navigate(['/subastas']);
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
