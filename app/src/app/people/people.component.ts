import { Component, OnInit } from '@angular/core';

import { PersonService } from '../services/person.service';
import { Person } from '../models/person';

import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people: Person[] = [];

  constructor(
    private _auth: AuthService,
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this._auth.getUserDetails()) this.router.navigate(['/login']);
    else {
      this.getPeople();
    }
    
  }

  getPeople(): void {
    this.personService.getPeople(this._auth.getUserDetails()[0]['_id']).subscribe(o => this.people = o);
  }

  delete(id: string): void {
    this.personService.deletePerson(id).subscribe();
    this.getPeople();
  }

}
