import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subasta } from '../modelos/subasta';

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
      .append('fechaHoraLimite', subasta.fechaHoraLimite)
      .append('fechaHoraInicio', subasta.fechaHoraInicio);

    return this.http.post(`${this.baseUrl}/nuevo`, { params });
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

    return this.http.put(`${this.baseUrl}/editar`, { params });
  }

  obtenerSubasta(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get(`${this.baseUrl}/obtener`, { params });
  }
}
