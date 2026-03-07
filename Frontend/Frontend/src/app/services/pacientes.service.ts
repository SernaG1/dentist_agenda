import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private base = '/api/pacientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(this.base);
  }

  obtener(id: number): Observable<any> {
    return this.http.get(`${this.base}/${id}`);
  }

  crear(data: any): Observable<any> {
    return this.http.post(this.base, data);
  }

  actualizar(id: number, data: any): Observable<any> {
    return this.http.put(`${this.base}/${id}`, data);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  restaurar(id: number): Observable<any> {
    return this.http.patch(`${this.base}/${id}/restaurar`, {});
  }
}
