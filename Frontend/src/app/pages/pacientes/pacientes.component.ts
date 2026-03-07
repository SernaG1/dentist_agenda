import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  pacientes: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    const data = localStorage.getItem('pacientes');
    this.pacientes = data ? JSON.parse(data) : [];
  }

  eliminarPaciente(index: number) {

    if(confirm("¿Eliminar paciente?")) {

      this.pacientes.splice(index,1);

      localStorage.setItem(
        'pacientes',
        JSON.stringify(this.pacientes)
      );

      this.cargarPacientes();
    }
  }

  editarPaciente(index:number){

    localStorage.setItem(
      'pacienteEditar',
      index.toString()
    );

    this.router.navigate(['/crear-paciente']);
  }

}
