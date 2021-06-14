import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeetingsComponent } from './meetings/meetings.component';
import { PeopleComponent } from './people/people.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import { FormsModule } from '@angular/forms';
import { PersonFormComponent } from './person-form/person-form.component';
import { AuthModule } from './auth/auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    MeetingsComponent,
    PeopleComponent,
    MeetingFormComponent,
    PersonFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
