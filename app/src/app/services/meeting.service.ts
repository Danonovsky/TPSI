import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { filter} from 'rxjs/operators';

import { Meeting } from '../models/meeting';

import { meetings } from '../mock-meetings';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor() { }

  getMeetings(date: Date): Observable<Meeting[]> {
    const tasks = of(meetings.filter(o => o.date.toLocaleDateString()==date.toLocaleDateString()));

    return tasks;
  }
}
