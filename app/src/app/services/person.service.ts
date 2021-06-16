import { Injectable } from '@angular/core';

import { Observable, of, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Person } from '../models/person';
import { Response } from '../models/response';
import { SingleResponse } from '../models/singleResponse';

import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
//import { resolveAny } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl: string = 'http://localhost:4000/';

  constructor(
    private _http: HttpClient,
    private _auth: AuthService
    ) { }

  getPeople(id: string): Observable<Person[]> {
    return this._http.get(`${this.baseUrl}people/getAll/${id}`).pipe(map(res => { 
      return (res as Response).data;
    }));
  }

  getPerson(id: string): Observable<Person> {
    return this._http.get(`${this.baseUrl}people/getOne/${id}`).pipe(map(res => {
      const person = {
        id: (res as SingleResponse).data._id,
        userId:(res as SingleResponse).data.userId,
        name:(res as SingleResponse).data.name};
      return person;
    }));
  }

  getEmptyPerson(): Person {
    return { id: '',userId:this._auth.getUserDetails()[0]['_id'], name: '' };
  }

  addPerson(person: Person): Observable<Person> {
    return this._http.post<Person>(`${this.baseUrl}people/add`,person).pipe();
  }

  updatePerson(person: Person): Observable<Person> {
    return this._http.post<Person>(`${this.baseUrl}people/edit`,person).pipe();
  }

  deletePerson(id: string): Observable<string> {
    return this._http.post<string>(`${this.baseUrl}people/delete`,{id:id}).pipe();
  }
}
