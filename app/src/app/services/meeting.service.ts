import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Meeting } from '../models/meeting';

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
    return this._http.get(`${this.baseUrl}meetings/getAll/${date.toLocaleDateString()}/${id}`).pipe(map(res => { 
      return (res as Response).data;
    }));
  }

  getMeeting(id: string): Observable<Meeting> {
    return this._http.get(`${this.baseUrl}meetings/getOne/${id}`).pipe(map(res => {
      return (res as SingleResponse).data;
    }));
  }

  getEmptyMeeting(): Meeting {
    return {
      id:'',
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

  updateMeeting(meeting: Meeting): Observable<Meeting> {
    return this._http.post<Meeting>(`${this.baseUrl}meetings/edit`,meeting).pipe();
  }

  delete(id: string): Observable<string> {
    return this._http.post<string>(`${this.baseUrl}meetings/delete`,{id:id}).pipe();
  }

  switch(meeting: Meeting): Observable<string> {
    return this._http.post<string>(`${this.baseUrl}meetings/switch`,{id:meeting.id, isDone: meeting.isDone}).pipe();
  }
}
