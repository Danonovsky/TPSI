import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  {path: '', redirectTo: '/meetings', pathMatch: 'full'},
  {path: 'meetings', component: MeetingsComponent },
  {path: 'meetings/:date', component: MeetingsComponent },
  {path: 'people', component: PeopleComponent },
  {path: 'meeting-form', component: MeetingFormComponent },
  {path: 'meeting-form/:id', component: MeetingFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
