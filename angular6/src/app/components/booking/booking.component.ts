import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {config} from "../../shared/config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Calendar} from "../../models/Calendar";
import {MatSnackBar} from "@angular/material";
import {Utils} from "../../shared/utils";
import {Booking} from "../../models/Booking";
import {User} from "../../models/User";

@Component({
  selector: 'app-booking',
  styleUrls: ['./booking.component.css'],
  template: `
    <div>
      <mat-card class="calendarBook_container">
        <mat-card-title>
          <h5 *ngIf="calendar">Réunion : {{calendar.title}}</h5>
        </mat-card-title>
        <mat-card-content>
          <mat-grid-list *ngIf="dates" cols="{{dates.length + 1}}" rowHeight="4:2">
            <mat-grid-tile>
            </mat-grid-tile>
            <mat-grid-tile class="calendarBook_datesCols" *ngFor="let d of dates">
              <h5>{{utils.dateToString2(d)}}</h5>
            </mat-grid-tile>
            <mat-grid-tile>
              {{config.currentUser().firstName }} {{config.currentUser().lastName}}
            </mat-grid-tile>
            <mat-grid-tile *ngFor="let d of dates">
              <mat-checkbox (change)="book($event, d, config.currentUser())"></mat-checkbox>
            </mat-grid-tile>
          </mat-grid-list>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class BookingComponent implements OnInit {

  readonly utils = Utils;
  readonly config = config;

  protected calendar: Calendar;
  protected bookings: Booking[];

  protected dates: Date[];

  constructor(private route: ActivatedRoute,
              protected http: HttpClient,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getCalendar(this.route.snapshot.paramMap.get('_id'));
  }

  private getCalendar(id: string) {
    return this.http.get<Calendar>(`${config.baseUrl}calendars/${id}`).subscribe(
      calendar => {
        this.calendar = calendar;
        this.getBookins();
        this.dates = this.getAllDates(new Date(this.calendar.startDate), new Date(this.calendar.endDate));
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000})
      }
    );
  }

  protected book(e, date, user) {
    if (e.checked) {
      this.addBooking(date, this.calendar._id, user._id)
    } else {

    }
  }

  private addBooking(date, calendarId, userId) {
    console.log(this.isReserved(date, userId));
    this.http.post<Booking>(`${config.baseUrl}bookings/add`, {
      calendarId: calendarId,
      userId: userId,
      reservedDate: date,
      creationDate: new Date()
    }).subscribe(
      data => {
        this.bookings.push(data);
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 2000})
      }
    )
  }

  protected isReserved(date, userId): Booking {
    console.log(date, userId, this.bookings);
    return this.bookings.find(b => (new Date(b.reservedDate) === date && b.userId === userId));
  }

  private deleteBooking(id: string) {
    this.http.post<Booking>(`${config.baseUrl}bookings/delete`, {bookingId: id}).subscribe(
      data => {
        console.log('deleted');
        this.bookings = this.bookings.filter(b => b._id != id);
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 2000})
      }
    )
  }

  private getBookins() {
    return this.http.get<Booking[]>(`${config.baseUrl}bookings/${this.calendar._id}`).subscribe(
      bookings => {
        this.bookings = bookings || [];
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000})
      }
    );
  }

  protected getAllDates(startDate, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }
}
