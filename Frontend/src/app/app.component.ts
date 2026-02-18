import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mostrarLogin = false;

  constructor(
    public auth: AuthService,
    private router: Router   // 👈 IMPORTANTE
  ) {}

  abrirLogin() {
    this.mostrarLogin = true;
  }

  cerrarLogin() {
    this.mostrarLogin = false;
  }

  logout() {
    this.auth.logout();

    // 👇 REDIRIGE AL INICIO
    this.router.navigate(['/']);
  }
}






