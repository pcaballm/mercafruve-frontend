import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss',
})
export class MenuLateralComponent implements OnInit, OnDestroy {
  @Input() mostrarMenus: any;
  constructor(private router: Router, private authService: AuthService) {
    console.log();
    console.log(this.mostrarMenus);
  }
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  navegarConfiguracionSubastas() {
    this.router.navigate(['/configuracion-subastas']);
  }
  navegarConfiguracionProductos() {
    this.router.navigate(['/configuracion-productos']);
  }

  comprobarRol() {
    let datosToken: any = this.authService.getDatosToken();
    return datosToken.Rol[0].authority !== 'ROLE_USER';
  }
}
