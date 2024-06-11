import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfiguracionProductosComponent } from './configuracion-productos/configuracion-productos.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxNumberBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { DxFileUploaderModule } from 'devextreme-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './productos/productos.component';
import {
  MatCardContent,
  MatCardImage,
  MatCardModule,
} from '@angular/material/card';
import { DetalleProductoComponent } from './productos/detalle-producto/detalle-producto.component';
import { ConfiguracionSubastasComponent } from './configuracion-subastas/configuracion-subastas.component';
import { SubastasComponent } from './subastas/subastas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleSubastaComponent } from './subastas/detalle-subasta/detalle-subasta.component';
import { SubastaAccionComponent } from './subastas/detalle-subasta/subasta-accion/subasta-accion.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from '../helpers/auth.interceptor';
import { RegistroComponent } from './registro/registro.component';
@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    MenuLateralComponent,
    ConfiguracionProductosComponent,
    ProductosComponent,
    DetalleProductoComponent,
    ConfiguracionSubastasComponent,
    SubastasComponent,
    DetalleSubastaComponent,
    SubastaAccionComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    DxDataGridModule,
    DxFileUploaderModule,
    DxDateBoxModule,
    HttpClientModule,
    MatCardModule,
    NgxPaginationModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxValidatorModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
