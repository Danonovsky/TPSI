import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MeetingService } from '../services/meeting.service';
import { PersonService } from '../services/person.service';

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
  myDate: String = 'xD';
  people: Person[] = [];

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private personService: PersonService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getMeeting();
    this.getPeople();
  }

  getMeeting(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id==0) this.meeting = this.meetingService.getEmptyMeeting();
    else this.meetingService.getMeeting(id).subscribe(o => this.meeting = o);
    this.myDate = (this.meeting?.date.getFullYear()+"-"+(this.meeting?.date.getUTCMonth()+1)+"-"+this.meeting?.date.getDate());
  }

  getPeople(): void {
    this.personService.getPeople().subscribe(o => this.people = o );
  }

  setDate(event: string): void {
    this.meeting.date = new Date(event);
  }

  setPerson(event: number): void {
    this.meeting.person = this.people.find(o => o.id==event) as Person;
  }

  goBack(): void {
    this.location.back();
  }

  add(): void {
    this.meetingService.addMeeting(this.meeting);
    this.goBack();
  }

  save(): void {
    this.meetingService.updateMeeting(this.meeting);
    this.goBack();
  }
}
