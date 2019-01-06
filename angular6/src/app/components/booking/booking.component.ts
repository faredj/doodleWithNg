import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {config} from "../../shared/config";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Calendar} from "../../models/Calendar";
import {MatSnackBar} from "@angular/material";
import {Utils} from "../../shared/utils";
import {Booking} from "../../models/Booking";
import {User} from "../../models/User";
import {header} from "express-validator/check";

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Component({
  selector: 'app-booking',
  styleUrls: ['./booking.component.css'],
  template: `
    <div>
      <mat-card class="calendarBook_container">
        <mat-card-title class="calendarBook_titleCard">
          <h5 *ngIf="calendar">Réunion : {{calendar.title}}</h5>
          <div class="calendarBook_linkToShare">
            <mat-card *ngIf="calendar">
              <p>
                Pour partager ce calendrier envoyer le lien ci-dessous :<br/>
                <b>{{config.baseUrl}}calendars/share/{{calendar._id}}</b>
              </p>
              <mat-icon
                matTooltip="Copier le lien"
                (click)="copyText(config.baseUrl+'calendars/share/'+calendar._id)">
                filter_none
              </mat-icon>
            </mat-card>
          </div>
        </mat-card-title>
        <mat-card-content>
          <mat-grid-list *ngIf="dates" cols="{{dates.length + 1}}" rowHeight="4:2">
            <mat-grid-tile>
            </mat-grid-tile>
            <mat-grid-tile class="calendarBook_datesCols" *ngFor="let d of dates">
              <h5>{{utils.dateToString2(d)}}</h5>
            </mat-grid-tile>
            <mat-grid-tile>
              <span>Participations</span>
            </mat-grid-tile>
            <mat-grid-tile *ngFor="let d of dates">
              <mat-icon>done</mat-icon>
              <h4>{{getBookingsByDate(d)}}</h4>
            </mat-grid-tile>
            <mat-grid-tile>
              {{config.connectedUser().firstName }} {{config.connectedUser().lastName}}
            </mat-grid-tile>
            <mat-grid-tile *ngFor="let d of dates">
              <mat-checkbox
                (change)="book($event, d, config.connectedUser(), this.getBooking(d, config.connectedUser()._id))"
                [checked]="!!this.getBooking(d, config.connectedUser()._id)">
              </mat-checkbox>
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
  protected bookings: Booking[] = [];

  protected dates: Date[];

  constructor(private route: ActivatedRoute,
              protected http: HttpClient,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getCalendar(this.route.snapshot.paramMap.get('_id'));
  }

  private getCalendar(id: string) {
    return this.http.get<Calendar>(`${config.baseUrl}calendars/${id}`, httpOptions).subscribe(
      calendar => {
        this.calendar = calendar;
        this.getBookings();
        this.dates = this.getAllDates(new Date(this.calendar.startDate), new Date(this.calendar.endDate));
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 2000})
      }
    );
  }

  protected book(e, date, user, booking) {
    if (e.checked) {
      if (this.getBooking(date, user._id) === null)
        this.addBooking(date, this.calendar._id, user._id);
      else
        this.snackBar.open('Créneau déjà réservé', 'fermer', {duration: 2000});
    } else {
      if (this.getBooking(date, user._id)) {
        this.deleteBooking(booking._id);
      } else
        this.snackBar.open('Erreur lors de la réservation', 'fermer', {duration: 2000});
    }
  }

  private addBooking(date, calendarId, userId) {
    this.http.post<Booking>(`${config.baseUrl}bookings/add`, {
      calendarId: calendarId,
      userId: userId,
      reservedDate: date,
      creationDate: new Date()
    }, httpOptions).subscribe(
      data => {
        this.bookings.push(data);
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 2000})
      }
    )
  }

  protected getBooking(date, userId): Booking {
    let bookingR: Booking = null;
    for (let b of this.bookings) {
      if (new Date(b.reservedDate).getTime() === date.getTime() && b.userId === userId) {
        bookingR = b;
        break;
      }
    }
    return bookingR;
  }

  private deleteBooking(id: string) {
    this.http.post<Booking>(`${config.baseUrl}bookings/delete`, {bookingId: id}, httpOptions).subscribe(
      data => {
        this.bookings = this.bookings.filter(b => b._id != id);
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 2000})
      }
    )
  }

  private getBookings() {
    return this.http.get<Booking[]>(`${config.baseUrl}bookings/${this.calendar._id}`, httpOptions).subscribe(
      bookings => {
        this.bookings = bookings || [];
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000})
      }
    );
  }

  protected getBookingsByDate(date): number {
    let nbBooking: number = 0;
    for (let b of this.bookings) {
      if (new Date(b.reservedDate).getTime() === date.getTime())
        nbBooking++;
    }
    return nbBooking;
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

  copyText(text: string) {
    let selected = document.createElement('textarea');
    selected.style.position = 'fixed';
    selected.style.left = '0';
    selected.style.top = '0';
    selected.style.opacity = '0';
    selected.value = text;
    document.body.appendChild(selected);
    selected.focus();
    selected.select();
    document.execCommand('copy');
    document.body.removeChild(selected);
    this.snackBar.open('Lien copié !', 'fermer', {duration: 1000})
  }
}
