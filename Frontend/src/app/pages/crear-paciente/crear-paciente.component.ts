import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent {

  // ================= PACIENTE =================
paciente = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: '',
  observaciones: ''
};


  // ================= GUARDAR =================
  constructor(private pacientesService: PacientesService) {}

  guardarPaciente(): void {
    const nuevoPaciente = {
      ...this.paciente
    };

    this.pacientesService.crear(nuevoPaciente).subscribe({
      next: (res) => {
        console.log('Paciente creado:', res);
        alert('Paciente guardado correctamente');
        this.resetFormulario();
      },
      error: (err) => {
        console.error('Error al crear paciente', err);
        // Mostrar mensajes de validación del backend si existen
        if (err?.error?.errores && Array.isArray(err.error.errores)) {
          const msgs = err.error.errores.map((e: any) => e.msg || e.message || JSON.stringify(e));
          alert('Errores: \n' + msgs.join('\n'));
        } else if (err?.error?.message) {
          alert('Error: ' + err.error.message);
        } else {
          alert('Error al guardar paciente. Revisa la consola.');
        }
      }
    });
  }

  private resetFormulario() {
    this.paciente = {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      observaciones: ''
    };

  }
}



