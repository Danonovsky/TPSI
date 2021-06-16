import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Meeting } from '../models/meeting';

import { maxMeetingId, meetings } from '../mock-meetings';
import { Response } from '../models/response';
import { SingleResponse } from '../models/singleResponse';

import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  baseUrl: string = 'http://localhost:4000/';

  constructor(
    private _http: HttpClient,
    private _auth: AuthService
    ) { }

  getMeetings(date: Date, id: String): Observable<Meeting[]> {
    //sDate = date.toLocaleDateString();
    return this._http.get(`${this.baseUrl}meetings/getAll/${date.toLocaleDateString()}/${id}`).pipe(map(res => { 
      return (res as Response).data;
    }));
  }

  getMeeting(id: number): Observable<Meeting> {
    let meet = meetings.find(o => o.id === id) as Meeting;
    return of(meet);
  }

  getEmptyMeeting(): Meeting {
    return {
      id: 0,
      userId: this._auth.getUserDetails()[0]['_id'],
      person: {id:'',userId:'',name:''},
      title: '',
      description: '',
      isDone: false,
      date: new Date()
    };
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this._http.post<Meeting>(`${this.baseUrl}meetings/add`,meeting).pipe();
    //meetings.push(meeting);
  }

  updateMeeting(meeting: Meeting): void {
    meetings[meetings.findIndex(o => o.id==meeting.id)] = meeting;
  }

  delete(id: number): void {
    //todo
  }
}
