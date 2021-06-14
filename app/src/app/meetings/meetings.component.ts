import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Meeting } from '../models/meeting';
import { ActivatedRoute, Router } from '@angular/router';

import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  date: Date = new Date(Date.now());

  previousDate: Date = new Date();
  previousDateText?: string;

  nextDate: Date = new Date();
  nextDateText?: string;

  meetings: Meeting[] = [];

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
    const id = String(this.route.snapshot.paramMap.get('date'));
    if(id!='null') {
      this.date = new Date(
        id.split('.')[1]
        +'.'+id.split('.')[0]
        +'.'+id.split('.')[2]
        );
    }

    this.previousDate.setDate((this.date.getDate()-1));
    this.nextDate?.setDate((this.date.getDate()+1));

    this.previousDateText = this.previousDate?.toLocaleDateString();
    this.nextDateText = this.nextDate?.toLocaleDateString();

    this.getMeetings();
  }

  getMeetings(): void {
    this.meetingService.getMeetings(this.date).subscribe(meetings => this.meetings = meetings);
  }

  getDateText() : string {
    return this.date.toLocaleDateString();
  }
}
