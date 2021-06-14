import { Component, OnInit } from '@angular/core';

import { PersonService } from '../services/person.service';
import { Person } from '../models/person';
import { people } from '../mock-people';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people: Person[] = [];

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(): void {
    this.personService.getPeople().subscribe(o => this.people = o);
    console.log(people);
  }

  delete(id: number): void {
    console.log(id);
    //async request to delete
    this.getPeople();
  }

}
