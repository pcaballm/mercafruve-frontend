import { Component, Input, OnInit } from '@angular/core';
import { SubastaService } from '../../../../services/subasta.service';

@Component({
  selector: 'app-subasta-accion',
  templateUrl: './subasta-accion.component.html',
  styleUrl: './subasta-accion.component.scss',
})
export class SubastaAccionComponent implements OnInit {
  @Input() id!: string;
  subastaAccion: any;
  constructor(private subastaService: SubastaService) {}
  ngOnInit(): void {
    this.subastaService
      .obtenerSubastaAccion(parseInt(this.id))
      .toPromise()
      .then((sub) => {
        this.subastaAccion = sub;
      });
  }
}
