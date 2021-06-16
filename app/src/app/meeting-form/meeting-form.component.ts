import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MeetingService } from '../services/meeting.service';
import { PersonService } from '../services/person.service';
import { AuthService } from '../services/auth.service';

import { Meeting } from '../models/meeting';
import { Person } from '../models/person';


@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {
  //meeting!: Meeting;
  meeting!: Meeting;
  people: Person[] = [];

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private personService: PersonService,
    private _auth: AuthService,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(!this._auth.getUserDetails()) this.router.navigate(['/login']);
    else {
      this.getMeeting();
      this.getPeople();
    }
  }

  getMeeting(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id == undefined) this.meeting = this.meetingService.getEmptyMeeting();
    else this.meetingService.getMeeting(id).subscribe(o => this.meeting = o);
  }

  getPeople(): void {
    this.personService.getPeople(this._auth.getUserDetails()[0]['_id']).subscribe(o => this.people = o );
  }

  setDate(event: string): void {
    this.meeting.date = new Date(event);
  }

  setPerson(event: string): void {
    this.meeting.person = this.people.find(o => o.id==event) as Person;
  }

  goBack(): void {
    this.location.back();
  }

  add(): void {
    this.meetingService.addMeeting(this.meeting).subscribe();
    this.goBack();
  }

  save(): void {
    this.meetingService.updateMeeting(this.meeting).subscribe();
    this.goBack();
  }
}
