import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-whatsapp-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './whatsapp-panel.component.html',
  styleUrls: ['./whatsapp-panel.component.css']
})
export class WhatsappPanelComponent implements OnInit, OnDestroy {

  // Estado
  conectado = false;
  chats: any[] = [];
  chatSeleccionado: any = null;
  mensajes: any[] = [];
  nuevoMensaje = '';

  // UI
  cargando = false;
  error = '';
  exito = '';

  // Subscripciones
  private subscripciones: Subscription = new Subscription();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.verificarConexion();
    // Verificar conexión cada 10 segundos
    this.subscripciones.add(
      interval(10000).subscribe(() => this.verificarConexion())
    );
    // Actualizar chats cada 5 segundos
    this.subscripciones.add(
      interval(5000).subscribe(() => {
        if (this.conectado) {
          this.cargarChats();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscripciones.unsubscribe();
  }

  // Verificar estado de conexión
  verificarConexion() {
    this.http.get('/api/whatsapp/estado').subscribe({
      next: (res: any) => {
        this.conectado = res.conectado;
        if (this.conectado) {
          this.cargarChats();
        }
      },
      error: (err) => {
        this.conectado = false;
      }
    });
  }

  // Conectar WhatsApp
  conectar() {
    this.cargando = true;
    this.error = '';
    this.http.post('/api/whatsapp/conectar', {}).subscribe({
      next: (res: any) => {
        this.exito = res.mensaje;
        this.cargando = false;
        setTimeout(() => {
          this.verificarConexion();
        }, 3000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error conectando WhatsApp';
        this.cargando = false;
      }
    });
  }

  // Desconectar
  desconectar() {
    if (confirm('¿Desconectar WhatsApp?')) {
      this.http.post('/api/whatsapp/desconectar', {}).subscribe({
        next: (res) => {
          this.conectado = false;
          this.chats = [];
          this.chatSeleccionado = null;
          this.exito = 'WhatsApp desconectado';
        },
        error: (err) => {
          this.error = 'Error al desconectar';
        }
      });
    }
  }

  // Cargar chats
  cargarChats() {
    this.http.get('/api/whatsapp/chats').subscribe({
      next: (res: any) => {
        this.chats = res.chats;
      },
      error: (err) => {
        console.error('Error cargando chats:', err);
      }
    });
  }

  // Seleccionar chat
  seleccionarChat(chat: any) {
    this.chatSeleccionado = chat;
    this.mensajes = [];
    this.nuevoMensaje = '';
    this.cargarMensajes();
  }

  // Cargar mensajes del chat
  cargarMensajes() {
    if (!this.chatSeleccionado) return;

    this.http.get(`/api/whatsapp/chats/${this.chatSeleccionado.id}`).subscribe({
      next: (res: any) => {
        this.mensajes = res.mensajes.reverse();
      },
      error: (err) => {
        console.error('Error cargando mensajes:', err);
      }
    });
  }

  // Enviar mensaje
  enviarMensaje() {
    if (!this.nuevoMensaje.trim() || !this.chatSeleccionado) {
      return;
    }

    const numero = this.chatSeleccionado.id.replace('@c.us', '');
    const payload = {
      numero: numero,
      mensaje: this.nuevoMensaje
    };

    this.http.post('/api/whatsapp/enviar', payload).subscribe({
      next: (res: any) => {
        this.nuevoMensaje = '';
        this.exito = 'Mensaje enviado';
        setTimeout(() => this.exito = '', 3000);
        this.cargarMensajes();
      },
      error: (err) => {
        this.error = err.error?.error || 'Error enviando mensaje';
      }
    });
  }

  // Formatear fecha
  formatearFecha(timestamp: number): string {
    const fecha = new Date(timestamp * 1000);
    return fecha.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Contar no leídos total
  totalNoLeidos(): number {
    return this.chats.reduce((sum, chat) => sum + (chat.noLidos || 0), 0);
  }
}
