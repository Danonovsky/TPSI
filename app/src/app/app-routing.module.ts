import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { PeopleComponent } from './people/people.component';
import { PersonFormComponent } from './person-form/person-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/meetings', pathMatch: 'full'},
  { path: 'meetings', component: MeetingsComponent },
  { path: 'meetings/:date', component: MeetingsComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'meeting-form', component: MeetingFormComponent },
  { path: 'meeting-form/:id', component: MeetingFormComponent },
  { path: 'person-form', component: PersonFormComponent },
  { path: 'person-form/:id', component: PersonFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
