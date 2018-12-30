import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthenticationGuard} from "./shared/app.guard";
import {CalendarComponent} from "./calendar/calendar.component";
import {CalendarListComponent} from "./calendar-list/calendar-list.component";


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
      }
    ]/*canActivate: [AuthenticationGuard]*/
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
