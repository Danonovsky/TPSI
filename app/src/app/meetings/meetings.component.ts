import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Meeting } from '../models/meeting';
import { ActivatedRoute, Router } from '@angular/router';

import { MeetingService } from '../services/meeting.service';
import { AuthService } from '../services/auth.service';

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
    private _auth: AuthService,
    private meetingService: MeetingService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(!this._auth.getUserDetails()) this.router.navigate(['/login']);
    else {
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
    
  }

  getMsg(event: string) {
    if(event=='refresh') this.getMeetings();
  }

  getMeetings(): void {
    this.meetingService.getMeetings(this.date,this._auth.getUserDetails()[0]['_id']).subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  getDateText() : string {
    return this.date.toLocaleDateString();
  }
}
