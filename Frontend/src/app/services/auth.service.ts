import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    // Restaurar sesión desde localStorage si existe
    const sesionGuardada = localStorage.getItem('dentista_logueado');
    if (!sesionGuardada) {
      localStorage.setItem('dentista_logueado', 'false');
    }
  }

  login(usuario: string, clave: string): boolean {
    // Usuario de prueba
    if (usuario === 'odontologo' && clave === '1234') {
      localStorage.setItem('dentista_logueado', 'true');
      localStorage.setItem('dentista_usuario', usuario);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.setItem('dentista_logueado', 'false');
    localStorage.removeItem('dentista_usuario');
  }

  estaLogueado(): boolean {
    const logueado = localStorage.getItem('dentista_logueado');
    return logueado === 'true';
  }

  obtenerUsuario(): string | null {
    return localStorage.getItem('dentista_usuario');
  }
}



