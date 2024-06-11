import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subasta } from '../models/subasta';

@Injectable({
  providedIn: 'root',
})
export class SubastaService {
  private baseUrl = 'http://localhost:8080/subasta';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/obtenerTodos`);
  }

  deleteSubasta(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.delete(`${this.baseUrl}/borrar`, { params });
  }

  insertarSubasta(subasta: Subasta) {
    let params = new HttpParams()
      .append('nombre', subasta.nombre)
      .append('descripcion', subasta.descripcion)
      .append('producto', subasta.producto)
      .append('productor', subasta.productor)
      .append('cantidad', subasta.cantidad)
      .append('precioSalida', subasta.precioSalida)
      .append('pujaMinima', subasta.pujaMinima)
      .append('fechaHoraLimite', subasta.fechaHoraLimite.toLocaleString())
      .append('fechaHoraInicio', subasta.fechaHoraInicio);

    const options = {
      params: params,
    };

    return this.http.post(`${this.baseUrl}/nuevo`, [], options);
  }

  editarSubasta(subasta: Subasta) {
    let params = new HttpParams()
      .append('nombre', subasta.nombre)
      .append('descripcion', subasta.descripcion)
      .append('producto', subasta.producto)
      .append('productor', subasta.productor)
      .append('cantidad', subasta.cantidad)
      .append('precioSalida', subasta.precioSalida)
      .append('pujaMinima', subasta.pujaMinima)
      .append('fechaHoraLimite', subasta.fechaHoraLimite)
      .append('fechaHoraInicio', subasta.fechaHoraInicio);

    const options = {
      params: params,
    };

    return this.http.put(`${this.baseUrl}/editar`, [], options);
  }

  obtenerSubasta(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get(`${this.baseUrl}/obtener`, { params });
  }

  obtenerSubastaAccion(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get(`${this.baseUrl}/obtener/subastaAccion`, { params });
  }

  pujarSubasta(
    id: number,
    usuario: string,
    puja: number,
    fechaHora: string
  ): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('usuario', usuario)
      .append('puja', puja)
      .append('fechaHora', fechaHora);

    const options = {
      params: params,
    };

    return this.http.put(`${this.baseUrl}/subastaAccion/puja`, [], options);
  }

  obtenerLogSubastas(id: number): Observable<any> {
    let params = new HttpParams().append('id', id);
    const options = {
      params: params,
    };
    return this.http.get(`${this.baseUrl}/obtenerTodos/logSubasta`, options);
  }
}
