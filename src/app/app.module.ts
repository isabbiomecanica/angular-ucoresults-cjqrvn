import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//import { AngularFirestore } from '@angular/fire/firestore';
//import { AngularFireModule } from '@angular/fire';
//import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
//import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

// import { HeroesComponent } from './heroes/heroes.component';
// import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteDetailComponent } from './paciente-detail/paciente-detail.component';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, MaterialModule,
                  AngularFireModule.initializeApp(environment.firebase),
                  AngularFireDatabaseModule ],
  declarations: [ AppComponent, HelloComponent, PacientesComponent, 
                  PacienteDetailComponent, MessagesComponent, DashboardPacienteComponent],
                 // providers: [AngularFirestore],
  

  /*declarations: [ AppComponent, HelloComponent, HeroesComponent, 
                  HeroDetailComponent, MessagesComponent, DashboardComponent, PacientesComponent, PacienteDetailComponent, DashboardPacienteComponent],
                 // providers: [AngularFirestore], */
  
  
  
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
