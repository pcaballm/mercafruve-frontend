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
import { DxDataGridModule, DxDateBoxModule } from 'devextreme-angular';
import { DxFileUploaderModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
