import { Injectable } from '@angular/core';

import { Observable, of, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Person } from '../models/person';
import { Response } from '../models/response';
import { SingleResponse } from '../models/singleResponse';

import { people } from '../mock-people';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { resolveAny } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl: string = 'http://localhost:4000/';

  constructor(private _http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

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
    return { id: '',userId:'', name: '' };
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
