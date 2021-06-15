import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { filter} from 'rxjs/operators';

import { Meeting } from '../models/meeting';

import { maxMeetingId, meetings } from '../mock-meetings';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor() { }

  getMeetings(date: Date): Observable<Meeting[]> {
    const tasks = of(meetings.filter(o => o.date.toLocaleDateString()==date.toLocaleDateString()));

    return tasks;
  }

  getMeeting(id: number): Observable<Meeting> {
    let meet = meetings.find(o => o.id === id) as Meeting;
    return of(meet);
  }

  getEmptyMeeting(): Meeting {
    return {
      id: 0,
      userId: 0,
      person: {id:'',userId:'',name:''},
      title: '',
      description: '',
      isDone: false,
      date: new Date()
    };
  }

  addMeeting(meeting: Meeting): void {
    meetings.push(meeting);
  }

  updateMeeting(meeting: Meeting): void {
    meetings[meetings.findIndex(o => o.id==meeting.id)] = meeting;
  }

  delete(id: number): void {
    //todo
  }
}
