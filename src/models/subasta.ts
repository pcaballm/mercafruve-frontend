export class Subasta {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public producto: string,
    public productor: string,
    public cantidad: number,
    public precioSalida: number,
    public pujaMinima: number,
    public fechaHoraLimite: string,
    public fechaHoraInicio: string
  ) {}
}
