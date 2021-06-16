import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//import { EventEmitter } from 'stream';

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
  @Output() emitter: EventEmitter<string> = new EventEmitter();

  constructor(
    private meetingService: MeetingService
  ) { }

  ngOnInit(): void {
  }

  changeStatus(): void {
    this.meetingService.switch(this.meeting).subscribe();
    this.emitter.emit('refresh');
  }

  delete(id: string): void {
    this.meetingService.delete(id).subscribe();
    this.emitter.emit('refresh');
  }
}
