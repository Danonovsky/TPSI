import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Meeting } from '../models/meeting';

import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  date: Date = new Date(Date.now());
  meetings: Meeting[] = [];

  constructor(private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.getMeetings();
  }

  getMeetings(): void {
    this.meetingService.getMeetings(this.date).subscribe(meetings => this.meetings = meetings);
  }

  getDateText() : string {
    return this.date.toLocaleDateString();
  }

  increaseDate() : void {
    this.date.setDate(this.date.getDate() + 1);
    this.getMeetings();
  }

  decreaseDate(): void {
    this.date.setDate(this.date.getDate() - 1);
    this.getMeetings();
  }

}
