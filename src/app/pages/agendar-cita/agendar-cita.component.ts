import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitasService, Cita } from '../../services/citas.service';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {

  cita: Cita = {
    nombre: '',
    fecha: '',
    hora: '',
    motivo: ''
  };

  editando = false;
  indexEditar: number | null = null;
  mensaje = '';

  constructor(private citasService: CitasService) {
    //  Cargar cita si viene desde "Editar"
    const data = localStorage.getItem('citaEditar');

    if (data) {
      const parsed = JSON.parse(data);
      this.cita = parsed.cita;
      this.indexEditar = parsed.index;
      this.editando = true;
      localStorage.removeItem('citaEditar');
    }
  }

  guardarCita() {
    //  Validación
    if (!this.cita.nombre || !this.cita.fecha || !this.cita.hora || !this.cita.motivo) {
      this.mensaje = '⚠️ Todos los campos son obligatorios';
      return;
    }

    if (this.editando && this.indexEditar !== null) {
      this.citasService.actualizarCita(this.indexEditar, this.cita);
      this.mensaje = '✏️ Cita actualizada correctamente';
    } else {
      this.citasService.agregarCita(this.cita);
      this.mensaje = '✅ Cita guardada correctamente';
    }

    this.resetFormulario();
  }

  resetFormulario() {
    this.cita = {
      nombre: '',
      fecha: '',
      hora: '',
      motivo: ''
    };
    this.editando = false;
    this.indexEditar = null;
  }
}


