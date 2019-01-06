import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthenticationGuard} from "./shared/app.guard";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {CalendarListComponent} from "./components/calendar-list/calendar-list.component";
import {BookingComponent} from "./components/booking/booking.component";


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: '',
        component: CalendarListComponent
      },
      {
        path: 'create',
        component: CalendarComponent
      },
      {
        path: 'book/:_id',
        component: BookingComponent
      }
    ],
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
