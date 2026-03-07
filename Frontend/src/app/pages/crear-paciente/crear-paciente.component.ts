import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebcamModule, WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, WebcamModule],
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent implements OnInit {

  // ================= FOTO =================
  private trigger: Subject<void> = new Subject<void>();
  imagen: WebcamImage | null = null;

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.imagen = webcamImage;
  }

  // ================= PACIENTE =================
  paciente = {
    nombre: '',
    tipoDocumento: '',
    numeroDocumento: '',
    telefono: '',
    correo: '',
    observaciones: ''
  };

  // índice del paciente cuando se edita
  editIndex: number | null = null;

  // ================= CARGAR PACIENTE PARA EDITAR =================
  ngOnInit(): void {

    const index = localStorage.getItem('pacienteEditar');

    if(index !== null){

      this.editIndex = Number(index);

      const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');

      const paciente = pacientes[this.editIndex];

      if(paciente){

        this.paciente = {
          nombre: paciente.nombre,
          tipoDocumento: paciente.tipoDocumento,
          numeroDocumento: paciente.numeroDocumento,
          telefono: paciente.telefono,
          correo: paciente.correo,
          observaciones: paciente.observaciones
        };

        if(paciente.foto){
          this.imagen = {
            imageAsDataUrl: paciente.foto
          } as WebcamImage;
        }

      }

    }

  }

  // ================= GUARDAR =================
  guardarPaciente(): void {

    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');

    const nuevoPaciente = {
      ...this.paciente,
      foto: this.imagen?.imageAsDataUrl || null
    };

    if(this.editIndex !== null){

      // EDITAR
      pacientes[this.editIndex] = nuevoPaciente;

      alert('Paciente actualizado correctamente');

      localStorage.removeItem('pacienteEditar');

    }else{

      // CREAR
      pacientes.push(nuevoPaciente);

      alert('Paciente guardado correctamente');

    }

    localStorage.setItem('pacientes', JSON.stringify(pacientes));

    // Resetear formulario
    this.paciente = {
      nombre: '',
      tipoDocumento: '',
      numeroDocumento: '',
      telefono: '',
      correo: '',
      observaciones: ''
    };

    this.imagen = null;
    this.editIndex = null;

  }

}



