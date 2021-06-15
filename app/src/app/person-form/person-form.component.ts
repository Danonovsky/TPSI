import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PersonService } from '../services/person.service';
import { Person } from '../models/person';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  person!: Person

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private _auth: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPerson();
    console.log(this.person);
  }

  getPerson(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    if(id==null) this.person = this.personService.getEmptyPerson();
    else this.personService.getPerson(id).subscribe(o => {
      this.person = o;
    });
  }

  goBack(): void {
    this.location.back();
  }

  add(): void {
    this.person.userId=this._auth.getUserDetails()[0]['_id'];
    this.personService.addPerson(this.person).subscribe();
    this.goBack();
  }

  save(): void {
    this.personService.updatePerson(this.person);
    this.goBack();
  }

}
