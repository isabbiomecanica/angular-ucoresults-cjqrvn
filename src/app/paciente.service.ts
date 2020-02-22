import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Paciente } from './paciente';
import { datoPaciente } from './datopaciente';

import { MessageService } from './message.service';


import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'firebase/firestore';

// export const PACIENTES: Paciente[] = [
export const PACIENTES: Paciente[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

// export Dato: Paciente[];

@Injectable({
  providedIn: 'root',
})
export class PacienteService {

  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

   Dato : Paciente[] = [];

  constructor(private messageService: MessageService, public afd: AngularFireDatabase) {
   // this.itemsRef = afd.list('Usuarios');
    // Use snapshotChanges().map() to store the key
   // console.log("Listado");
   // this.itemsRef=this.afd.list('/Usuarios');

    // Llamamos los datos desde Firebase e iteramos los datos con data.ForEach y por
    // último pasamos los datos a JSON
    
    /*
    this.itemsRef.snapshotChanges().subscribe(data => { 
      this.Dato = [];
      //console.log("-Dato-");
      //console.log(data.length);
      data.forEach(item => {
        let tempPaciente : Paciente = {id: 1,name: "Vacio"};
        // console.log("-Dato-2");
        tempPaciente.id = 1;
        tempPaciente.name = item.payload;
        //let a = item.payload.toJSON(); 
        //a['$key'] = item.key;
        this.Dato.push(tempPaciente as Paciente);
       // console.log(tempPaciente);
       // console.log(this.Dato.length);
      })
      console.log(this.Dato.length);
    })

    
   //console.log(this.Dato.length);
*/
      


   }

  getPacientes(public afd: AngularFireDatabase): Observable<Paciente[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('PacienteService: fetched pacientes');
    //return of(PACIENTES);
    // Use snapshotChanges().map() to store the key
    console.log("Listado");
    this.itemsRef=this.afd.list('/Usuarios');
    this.itemsRef.snapshotChanges().subscribe(data => { 
      this.Dato = [];
      var contador:integer = 0;
      data.forEach(item => {
        let tempPaciente : Paciente = {id: 1,name: "Vacio"};
        contador = contador + 1;
        tempPaciente.id = contador;
        tempPaciente.name = item.payload.val();
        this.Dato.push(tempPaciente as Paciente);
      })
      console.log(this.Dato.length);
    })
    return of(this.Dato);
   
  }

  getPaciente(id: number): Observable<Paciente> {
  // TODO: send the message _after_ fetching the hero
  this.messageService.add(`PacienteService: fetched paciente id=${id}`);
  //return of(PACIENTES.find(paciente => paciente.id === id));
  return of(this.Dato.find(paciente => paciente.id === id));
  }


}