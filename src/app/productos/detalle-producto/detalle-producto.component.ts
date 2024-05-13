import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../modelos/producto';
import { ProductosService } from '../../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss',
})
export class DetalleProductoComponent implements OnInit {
  producto!: any;
  id!: string;

  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    //this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.obtenerProductoPorId();
  }

  obtenerProductoPorId() {
    this.productosService
      .obtenerProducto(parseInt(this.id))
      .toPromise()
      .then((prod: Producto) => {
        this.producto = prod;
        this.productosService.obtenerImagen(prod.imagen).subscribe((data) => {
          const objectURL = URL.createObjectURL(data);
          this.producto.imagenCargada =
            this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      });
  }
}
