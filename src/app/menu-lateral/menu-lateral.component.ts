import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss',
})
export class MenuLateralComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  navegarConfiguracionSubastas() {
    this.router.navigate(['/configuracion-subastas']);
  }
  navegarConfiguracionProductos() {
    this.router.navigate(['/configuracion-productos']);
  }
}
