import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionProductosComponent } from './configuracion-productos/configuracion-productos.component';
import { ProductosComponent } from './productos/productos.component';
import { DetalleProductoComponent } from './productos/detalle-producto/detalle-producto.component';
import { ConfiguracionSubastasComponent } from './configuracion-subastas/configuracion-subastas.component';
import { SubastasComponent } from './subastas/subastas.component';
import { DetalleSubastaComponent } from './subastas/detalle-subasta/detalle-subasta.component';

const routes: Routes = [
  {
    path: 'configuracion-productos',
    component: ConfiguracionProductosComponent,
  },
  { path: 'productos', component: ProductosComponent },
  { path: 'detalle-producto', component: DetalleProductoComponent },
  { path: 'configuracion-subastas', component: ConfiguracionSubastasComponent },
  { path: 'subastas', component: SubastasComponent },
  { path: 'detalle-subasta', component: DetalleSubastaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
