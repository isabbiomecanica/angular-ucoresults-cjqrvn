import { Component, OnInit, Input } from '@angular/core';

import { Paciente } from '../paciente';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PacienteService }  from '../paciente.service';

@Component({
  selector: 'app-paciente-detail',
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css']
})
export class PacienteDetailComponent implements OnInit {

  @Input() paciente: Paciente;
  
 constructor(
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

}