import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logueado = false;

  login(usuario: string, clave: string): boolean {
    // Usuario de prueba
    if (usuario === 'odontologo' && clave === '1234') {
      this.logueado = true;
      return true;
    }
    return false;
  }

  logout() {
    this.logueado = false;
  }

  estaLogueado(): boolean {
    return this.logueado;
  }
}



