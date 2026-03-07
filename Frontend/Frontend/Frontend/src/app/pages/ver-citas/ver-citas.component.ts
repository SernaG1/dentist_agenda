import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CitasService, Cita } from '../../services/citas.service';

@Component({
  selector: 'app-ver-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-citas.component.html',
  styleUrls: ['./ver-citas.component.css']
})
export class VerCitasComponent implements OnInit {

  citas: Cita[] = [];

  constructor(
    private citasService: CitasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.citas = this.citasService.obtenerCitas();
  }

  eliminar(index: number) {
    this.citasService.eliminarCita(index);
  }

  editar(cita: Cita, index: number) {
    this.citasService.obtenerCitas();
    history.state.cita = { cita, index };
    this.router.navigate(['/agendar'], {
      state: { cita, index }
    });
  }
}

