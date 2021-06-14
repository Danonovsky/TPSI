import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PersonService } from '../services/person.service';
import { Person } from '../models/person';

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
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPerson();
    console.log(this.person);
  }

  getPerson(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id==0) this.person = this.personService.getEmptyPerson();
    else this.personService.getPerson(id).subscribe(o => this.person = o);
  }

  goBack(): void {
    this.location.back();
  }

  add(): void {
    this.personService.addPerson(this.person);
    this.goBack();
  }

  save(): void {
    this.personService.updatePerson(this.person);
    this.goBack();
  }

}
