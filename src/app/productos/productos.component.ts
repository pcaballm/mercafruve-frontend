import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
})
export class ProductosComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  constructor(
    private productosService: ProductosService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.productosService
      .obtenerTodos()
      .toPromise()
      .then((data) => {
        data.map((d: Producto) => {
          this.productosService.obtenerImagen(d.imagen).subscribe((data) => {
            const objectURL = URL.createObjectURL(data);
            d.imagenCargada = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
        });
        this.productos = data;
      });
  }

  verDetalleProducto(id: any) {
    this.router.navigate(['/detalle-producto'], {
      queryParams: {
        id: id,
      },
    });
  }

  ngOnDestroy(): void {}
  ngOnInit(): void {}
}
