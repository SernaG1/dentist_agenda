import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { CitasService, Cita } from '../../services/citas.service';

/* Angular Material */
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [
  CommonModule,     // ← IMPORTANTE
  FormsModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatFormFieldModule
],

  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {

  /* ===== Modelo de cita ===== */
  cita: Cita = {
    nombre: '',
    fecha: '',
    hora: '',
    motivo: ''
  };

  /* ===== Estados ===== */
  editando = false;
  indexEditar: number | null = null;
  mensaje = '';

  /* ===== Bloquear fechas pasadas ===== */
  minFecha: Date = new Date();

  constructor(private citasService: CitasService) {}

  /* ===== Guardar o actualizar ===== */
 guardarCita() {

  /* ===== Validación campos vacíos ===== */
  if (!this.cita.nombre || !this.cita.fecha || !this.cita.hora || !this.cita.motivo) {
    this.mensaje = '⚠️ Todos los campos son obligatorios';
    return;
  }

  /* ===== VALIDAR citas duplicadas ===== */
  const citas = this.citasService.obtenerCitas();

  const citaDuplicada = citas.some((c, index) => {
    return (
      c.fecha === this.cita.fecha &&
      c.hora === this.cita.hora &&
      index !== this.indexEditar   // permite editar sin bloquearse
    );
  });

  if (citaDuplicada) {
    this.mensaje = '⛔ Ya existe una cita en esa fecha y hora';
    return;
  }

  /* ===== Guardar o actualizar ===== */
  if (this.editando && this.indexEditar !== null) {
    this.citasService.actualizarCita(this.indexEditar, this.cita);
    this.mensaje = '✏️ Cita actualizada correctamente';
  } else {
    this.citasService.agregarCita(this.cita);
    this.mensaje = '✅ Cita guardada correctamente';
  }

  this.resetFormulario();
}


  /* ===== Cargar cita para edición ===== */
  cargarCita(cita: Cita, index: number) {
    this.cita = { ...cita };
    this.editando = true;
    this.indexEditar = index;
    this.mensaje = '📝 Editando cita seleccionada';
  }

  /* ===== Limpiar formulario ===== */
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




