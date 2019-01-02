import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {config} from "../../shared/config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Calendar} from "../../models/Calendar";
import {MatSnackBar} from "@angular/material";
import {Utils} from "../../shared/utils";

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
          <mat-grid-list *ngIf="dates" cols="{{dates.length}}" rowHeight="4:1">
            <mat-grid-tile *ngFor="let d of dates">
              <h5>{{utils.dateToString2(d)}}</h5>
            </mat-grid-tile>
          </mat-grid-list>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class BookingComponent implements OnInit {

  readonly utils = Utils;
  protected calendar: Calendar;

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
        this.dates = this.getAllDates(new Date(this.calendar.startDate), new Date(this.calendar.endDate));
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000})
      }
    );
  }

  getAllDates(startDate, endDate) {
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
