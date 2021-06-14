import { Component, Input, OnInit } from '@angular/core';

import { Meeting } from '../models/meeting';

import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  @Input()
  meeting!: Meeting;

  constructor(
    private meetingService: MeetingService
  ) { }

  ngOnInit(): void {
  }

  changeStatus(): void {
    this.meeting.isDone = !this.meeting.isDone;
  }

  delete(id: number): void {
    this.meetingService.delete(id);
  }
}
