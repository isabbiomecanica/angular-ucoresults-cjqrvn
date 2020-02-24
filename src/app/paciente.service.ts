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


import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { UTPatient } from '../clases/UTPatient.ts';

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

  constructor(private messageService: MessageService, public afd: AngularFireDatabase, private http: HttpClient) {
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
      var contador: number = 0;
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
  console.log(this.Dato);
  //return of(PACIENTES.find(paciente => paciente.id === id));
  return of(this.Dato.find(paciente => paciente.id === id));
  }

  getUDTPatient(PatientURL: string) {
    return this.http.get<UTPatient>(PatientURL)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}