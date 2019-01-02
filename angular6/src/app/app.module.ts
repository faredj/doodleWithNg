import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import {AuthenticationGuard} from "./shared/app.guard";
import { JwtModule } from '@auth0/angular-jwt';
import {CalendarComponent} from "./components/calendar/calendar.component";
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { BookingComponent } from './components/booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CalendarComponent,
    CalendarListComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'doodle-app'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
