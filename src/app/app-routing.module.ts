import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
// import { HeroesComponent } from './heroes/heroes.component';

import { PacienteDetailComponent }  from './paciente-detail/paciente-detail.component';
// import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

import { DashboardPacienteComponent }   from './dashboard-paciente/dashboard-paciente.component';
// import { DashboardComponent }   from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard-paciente', pathMatch: 'full' },
  { path: 'dashboard-paciente', component: DashboardPacienteComponent },
  { path: 'detail/:id', component: PacienteDetailComponent },
  { path: 'pacientes', component: PacientesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }