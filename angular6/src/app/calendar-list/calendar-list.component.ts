import {Component, OnInit} from '@angular/core';
import {Calendar} from "../models/Calendar";
import {config} from "../shared/config";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {calendarFormat} from "moment";
import {Utils} from "../shared/utils";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-calendar-list',
  styleUrls: ['./calendar-list.component.css'],
  template: `
    <div>
      <mat-card class="calendarList_container">
        <mat-card-title>
          <h5>Mes réunions</h5>
        </mat-card-title>
        <mat-card-content>
          <table mat-table [dataSource]="calendars" class="mat-elevation-z8">
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Titre</th>
              <td mat-cell *matCellDef="let c"> {{c.title}}</td>
            </ng-container>
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let c"> {{c.description}}</td>
            </ng-container>
            <ng-container matColumnDef="address">
              <th mat-header-cell *matHeaderCellDef>Lieux</th>
              <td mat-cell *matCellDef="let c"> {{c.address}}</td>
            </ng-container>
            <ng-container matColumnDef="startDate">
              <th mat-header-cell *matHeaderCellDef>Date de début</th>
              <td mat-cell *matCellDef="let c"> {{utils.dateToString(c.startDate)}}</td>
            </ng-container>
            <ng-container matColumnDef="endDate">
              <th mat-header-cell *matHeaderCellDef>Date de fin</th>
              <td mat-cell *matCellDef="let c"> {{utils.dateToString(c.endDate)}}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let row">-</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="dc"></tr>
            <tr mat-row *matRowDef="let row; columns: dc;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class CalendarListComponent implements OnInit {

  readonly utils = Utils;

  dc: string[] = ['title', 'description', 'address', 'startDate', 'endDate', 'actions'];
  calendars: Calendar[];

  constructor(protected http: HttpClient,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getCalendars();
  }

  getCalendars(): any {
    let params = new HttpParams().set('userId', config.currentUser._id);
    return this.http.get<Calendar[]>(`${config.baseUrl}calendars`, {params: params}).subscribe(
      calendars => {
        console.log(calendars);
        this.calendars = calendars;
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000})
      }
    );
  }
}
