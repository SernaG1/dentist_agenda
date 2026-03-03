import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { VerCitasComponent } from './pages/ver-citas/ver-citas.component';

import { DisenoSonrisaComponent } from './pages/servicios/diseno-sonrisa/diseno-sonrisa.component';
import { BlanqueamientoComponent } from './pages/servicios/blanqueamiento/blanqueamiento.component';
import { OrtodonciaComponent } from './pages/servicios/ortodoncia/ortodoncia.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'promociones', component: PromocionesComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'agendar', component: AgendarCitaComponent },
  { path: 'ver-citas', component: VerCitasComponent },

  { path: 'servicios/diseno-sonrisa', component: DisenoSonrisaComponent },
  { path: 'servicios/blanqueamiento', component: BlanqueamientoComponent },
  { path: 'servicios/ortodoncia', component: OrtodonciaComponent },
  
  { path: '**', redirectTo: '' }
];






