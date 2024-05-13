import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subasta } from '../../modelos/subasta';
import { Router } from '@angular/router';
import { SubastaService } from '../../services/subasta.service';

@Component({
  selector: 'app-subastas',
  templateUrl: './subastas.component.html',
  styleUrl: './subastas.component.scss',
})
export class SubastasComponent implements OnInit, OnDestroy {
  subastas: Subasta[] = [];
  p: number = 1;
  constructor(private subastaService: SubastaService, private router: Router) {
    this.subastaService
      .obtenerTodos()
      .toPromise()
      .then((data) => {
        this.subastas = data;
      });
  }

  navegarSubasta(id: any) {
    this.router.navigate(['/subasta'], {
      queryParams: {
        id: id,
      },
    });
  }

  comprobarAcceso(fechaInicio: string, fechaHoraLimite: string) {
    return (
      new Date() >= new Date(fechaInicio) &&
      new Date() < new Date(fechaHoraLimite)
    );
  }

  obtenerColor(fechaInicio: string, fechaHoraLimite: string) {
    let color = 'rgb(173, 64, 64)'; // Color predeterminado
    if (new Date() < new Date(fechaInicio)) {
      color = 'rgb(226 201 38 / 73%)'; // Antes de la fecha de inicio
    }
    if (
      new Date() > new Date(fechaInicio) &&
      new Date() < new Date(fechaHoraLimite)
    ) {
      color = '#89b999'; // Entre la fecha de inicio y la fecha límite
    }
    return { 'background-color': color };
  }

  ngOnDestroy(): void {}
  ngOnInit(): void {}
}
