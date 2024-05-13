import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class BarraNavegacionComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  navegarProductos() {
    this.router.navigate(['/productos']);
  }
  navegarSubastas() {
    this.router.navigate(['/subastas']);
  }
}
