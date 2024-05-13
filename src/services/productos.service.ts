import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private baseUrl = 'http://localhost:8080/producto';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/obtenerTodos`);
  }

  obtenerImagen(nombreImagen: string) {
    let params = new HttpParams().set('nombreImagen', nombreImagen);
    return this.http.get('http://localhost:8080/imagen/obtener', {
      params,
      responseType: 'blob',
    });
  }

  deleteProducto(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.delete(`${this.baseUrl}/borrar`, { params });
  }

  insertarProducto(
    nombre: string,
    descripcion: string,
    precio: number,
    productor: string,
    tipo: string,
    file: File
  ) {
    let params = new HttpParams()
      .append('nombre', nombre)
      .append('descripcion', descripcion)
      .append('precio', precio)
      .append('productor', productor)
      .append('tipo', tipo);
    const options = {
      params: params,
    };

    let formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/nuevo`, formData, options);
  }

  editarProducto(
    nombre: string,
    descripcion: string,
    precio: number,
    productor: string,
    tipo: string,
    file: File
  ) {
    let params = new HttpParams()
      .append('nombre', nombre)
      .append('descripcion', descripcion)
      .append('precio', precio)
      .append('productor', productor)
      .append('tipo', tipo);
    const options = {
      params: params,
    };

    let formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${this.baseUrl}/editar`, formData, options);
  }

  obtenerProducto(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get(`${this.baseUrl}/obtener`, { params });
  }
}
