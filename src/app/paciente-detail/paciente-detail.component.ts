import { Component, OnInit, Input, Observable } from '@angular/core';

import { Paciente } from '../paciente';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PacienteService }  from '../paciente.service';

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import 'firebase/firestore';

@Component({
  selector: 'app-paciente-detail',
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css'],
  
})
export class PacienteDetailComponent implements OnInit {

  @Input() paciente: Paciente;
  ref: AngularFireStorageReference;
  profileUrl: Observable<string | null>;
  
  
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
  const laURL: string;
  const id = +this.route.snapshot.paramMap.get('id');
  this.pacienteService.getPaciente(id)
    .subscribe(paciente => this.paciente = paciente);
  const fichero = "/usuarios/"+this.paciente.name+"/"+this.paciente.name+".json"
  console.log(fichero);
  this.ref = this.afStorage.ref(fichero);
  this.profileUrl = this.ref.getDownloadURL();
  console.log(this.profileUrl)
  this.profileUrl.subscribe(url=>{
     if(url){
         
         laURL=url;
         console.log(laURL);
         // descarga(laURL,this.paciente.name+".json");
         window.open(laURL);
     }});

  // window.navigator.msSaveBlob()

}

descarga(url, filename): void {
fetch(url).then(function(t) {
    return t.blob().then((b)=>{
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
    }
    );
});
}

}