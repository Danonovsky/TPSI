import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { filter} from 'rxjs/operators';

import { Person } from '../models/person';

import { people } from '../mock-people';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  getPeople(): Observable<Person[]> {
    const tasks = of(people);
    return tasks;
  }

  getEmptyPerson(): Person {
    return { id: 0, name: '' };
  }

  addPerson(person: Person): void {
    people.push(person);
  }
}
