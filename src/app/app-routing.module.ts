import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionProductosComponent } from './configuracion-productos/configuracion-productos.component';
import { ProductosComponent } from './productos/productos.component';
import { DetalleProductoComponent } from './productos/detalle-producto/detalle-producto.component';
import { ConfiguracionSubastasComponent } from './configuracion-subastas/configuracion-subastas.component';
import { SubastasComponent } from './subastas/subastas.component';
import { DetalleSubastaComponent } from './subastas/detalle-subasta/detalle-subasta.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: 'configuracion-productos',
    component: ConfiguracionProductosComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: ProductosComponent, canActivate: [AuthGuard] },
  {
    path: 'detalle-producto',
    component: DetalleProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracion-subastas',
    component: ConfiguracionSubastasComponent,
    canActivate: [AuthGuard],
  },
  { path: 'subastas', component: SubastasComponent, canActivate: [AuthGuard] },
  {
    path: 'detalle-subasta',
    component: DetalleSubastaComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
