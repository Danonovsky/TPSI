import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsComponent } from './meetings/meetings.component';
import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  {path: '', redirectTo: '/meetings', pathMatch: 'full'},
  {path: 'meetings', component: MeetingsComponent },
  {path: 'people', component: PeopleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
