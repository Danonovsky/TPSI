import { Injectable } from '@angular/core';

import { Observable, of, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Person } from '../models/person';
import { Response } from '../models/response';

import { people } from '../mock-people';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl: string = 'http://localhost:4000/';

  constructor(private _http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getPeople(id: string): Observable<Person[]> {
    //const tasks = of(people);
    //return tasks;
    return this._http.get(`${this.baseUrl}people/getAll/${id}`).pipe(map(res => { 
      //(res as Response).data.map(o => {id: o._id; userId: o.userId; name: o.name });
      return (res as Response).data;
    }));
  }

  getPerson(id: string): Observable<Person> {
    let meet = people.find(o => o.id === id) as Person;
    return of(meet);
  }

  getEmptyPerson(): Person {
    return { id: '',userId:'', name: '' };
  }

  addPerson(person: Person): Observable<Person> {
    console.log("Add person");
    console.log(`${this.baseUrl}people/add`);
    return this._http.post<Person>(`${this.baseUrl}people/add`,person).pipe(
    );
    //people.push(person);
  }

  updatePerson(person: Person): void {
    console.log("Update person");
    people[people.findIndex(o => o.id==person.id)] = person;
  }
}
