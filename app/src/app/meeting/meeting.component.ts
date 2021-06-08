import { Component, Input, OnInit } from '@angular/core';

import { Meeting } from '../models/meeting';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  @Input()
  meeting!: Meeting;

  constructor() { }

  ngOnInit(): void {
  }

  changeStatus(): void {
    this.meeting.isDone = !this.meeting.isDone;
  }
}
