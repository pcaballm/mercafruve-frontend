import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SubastaService } from '../../../services/subasta.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductosService } from '../../../services/productos.service';
import { Subasta } from '../../../models/subasta';
import { Producto } from '../../../models/producto';
import { DxDataGridComponent, DxValidatorComponent } from 'devextreme-angular';
import { SubastaAccion } from '../../../models/subastaAccion';
import moment from 'moment';
import countdown from 'countdown';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-detalle-subasta',
  templateUrl: './detalle-subasta.component.html',
  styleUrl: './detalle-subasta.component.scss',
})
export class DetalleSubastaComponent implements OnInit, OnDestroy {
  @ViewChild('validator')
  validator!: DxValidatorComponent;
  @ViewChild('dataGrid')
  dataGrid!: DxDataGridComponent;
  id: any;
  producto: any;
  subasta: any;
  subastaAccion: any;
  puja: any;
  dataSource: any;
  tiempo: any;
  timerId: any;
  columns = [
    { dataField: 'usuario', caption: 'nombre' },
    { dataField: 'puja', caption: 'puja' },
    { dataField: 'fechaHoraPuja', caption: 'fechaHoraPuja' },
  ];
  constructor(
    private subastaService: SubastaService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private productosService: ProductosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.obtenerDatosPorSubastaId();
  }

  obtenerDatosPorSubastaId() {
    this.subastaService
      .obtenerSubasta(parseInt(this.id))
      .toPromise()
      .then((sub: Subasta) => {
        this.subasta = sub;
        this.obtenerTiempoRestante();
        this.productosService
          .obtenerProducto(parseInt(sub.producto))
          .subscribe((prod: Producto) => {
            this.producto = prod;
            this.productosService
              .obtenerImagen(prod.imagen)
              .subscribe((data) => {
                const objectURL = URL.createObjectURL(data);
                this.producto.imagenCargada =
                  this.sanitizer.bypassSecurityTrustUrl(objectURL);
              });
          });
        this.subastaService
          .obtenerSubastaAccion(parseInt(this.id))
          .subscribe((subAccion) => {
            this.subastaAccion = subAccion;
            this.puja = subAccion.pujaActual + sub.pujaMinima;
          });
        this.subastaService.obtenerLogSubastas(this.id).subscribe((res) => {
          this.dataSource = res;
        });
      });
  }

  pujar() {
    let usuario: any = this.authService.getDatosToken()?.sub;
    this.subastaService
      .pujarSubasta(
        this.id,
        usuario,
        this.puja,
        new Date().toISOString().split('Z')[0]
      )
      .subscribe(
        (subAccion: SubastaAccion) => {
          this.puja = subAccion.pujaActual + this.subasta.pujaMinima;
          this.subastaAccion = subAccion;
        },
        () => {},
        () => {
          this.subastaService.obtenerLogSubastas(this.id).subscribe((res) => {
            this.dataSource = res;
          });
        }
      );

    console.log(this.puja);
  }
  formatDate(value: string) {
    return moment(value).format('DD/MM/yyyy HH:mm');
  }

  obtenerTiempoRestante() {
    this.timerId = countdown(
      new Date(this.subasta.fechaHoraLimite),
      (t) => {
        this.tiempo = t;
      },
      countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
