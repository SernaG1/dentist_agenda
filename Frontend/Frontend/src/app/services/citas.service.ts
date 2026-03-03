import { Injectable } from '@angular/core';

export interface Cita {
  nombre: string;
  fecha: string;
  hora: string;
  motivo: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private citas: Cita[] = [];

  obtenerCitas(): Cita[] {
    return this.citas;
  }

  agregarCita(cita: Cita) {
    this.citas.push({ ...cita });
  }

  eliminarCita(index: number) {
    this.citas.splice(index, 1);
  }

  actualizarCita(index: number, cita: Cita) {
    this.citas[index] = { ...cita };
  }
}

