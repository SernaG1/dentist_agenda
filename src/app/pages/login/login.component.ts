import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario = '';
  clave = '';
  error = '';

  @Output() cerrar = new EventEmitter<void>();

  constructor(private auth: AuthService) {}

  ingresar() {
    if (this.auth.login(this.usuario, this.clave)) {
      this.cerrar.emit(); // cierra el modal
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}


