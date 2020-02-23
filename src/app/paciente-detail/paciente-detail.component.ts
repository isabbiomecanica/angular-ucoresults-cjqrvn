import { Component, OnInit, Input } from '@angular/core';

import { Paciente } from '../paciente';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PacienteService }  from '../paciente.service';

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import 'firebase/firestore';

@Component({
  selector: 'app-paciente-detail',
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css']
})
export class PacienteDetailComponent implements OnInit {

  @Input() paciente: Paciente;
  ref: AngularFireStorageReference;
  
 constructor(private afStorage: AngularFireStorage,
  private route: ActivatedRoute,
  private pacienteService: PacienteService,
  private location: Location
) {}

ngOnInit(): void {
  this.getPaciente();
}
getPaciente(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.pacienteService.getPaciente(id)
    .subscribe(paciente => this.paciente = paciente);
}

goBack(): void {
  this.location.back();
}

download(): void {
  //this.ref = this.afStorage.ref(id);
  const id = +this.route.snapshot.paramMap.get('id');
  this.pacienteService.getPaciente(id)
    .subscribe(paciente => this.paciente = paciente);
  const fichero = "/usuarios/"+this.paciente.name+"/"+this.paciente.name+".JSON"
  console.log(fichero);
  this.ref = this.afStorage.ref(fichero);
}

}