import { SafeUrl } from '@angular/platform-browser';

export class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public imagen: string,
    public precio: number,
    public productor: string,
    public tipo: string,
    public imagenCargada: SafeUrl
  ) {}
}
