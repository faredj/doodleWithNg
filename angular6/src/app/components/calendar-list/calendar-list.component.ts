import {Component, OnInit} from '@angular/core';
import {Calendar} from "../../models/Calendar";
import {config} from "../../shared/config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";
import {Utils} from "../../shared/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-calendar-list',
  styleUrls: ['./calendar-list.component.css'],
  template: `
    <mat-progress-bar *ngIf="isLoading" mode="indeterminate" color="warn"></mat-progress-bar>
    <div>
      <mat-card class="calendarList_container">
        <mat-card-title class="calendarList_titleCard">
          <h5>Mes réunions</h5>
          <div class="calendarList_fieldShare">
            <mat-card>
              <form [formGroup]="refForm" (ngSubmit)="participate()">
                <mat-form-field>
                  <input matInput formControlName="refToShare" placeholder="Référence calendrier">
                </mat-form-field>
                <button mat-button mat-raised-button class="calendarList_btnShare">
                  Participer
                </button>
              </form>
            </mat-card>
          </div>
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
            <ng-container matColumnDef="_id" class="calendarList_actions">
              <th mat-header-cell *matHeaderCellDef class="pl25">Actions</th>
              <td mat-cell *matCellDef="let c">
                <button mat-button
                        [disabled]="isDeleting"
                        (click)="this.delete(c._id)"
                        matTooltip="Supprimer">
                  <mat-icon>delete</mat-icon>
                </button>
                <button mat-button
                        [routerLink]="['book', c._id]"
                        matTooltip="Réserver">
                  <mat-icon>assignment_turned_in</mat-icon>
                </button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="dc"></tr>
            <tr mat-row *matRowDef="let row; columns: dc;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
      <mat-card class="calendarList_container">
        <mat-card-title class="calendarList_titleCard">
          <h5>Invitations aux réunions</h5>
        </mat-card-title>
        <mat-card-content>
          <table mat-table [dataSource]="calendarsToParticipate" class="mat-elevation-z8">
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
            <ng-container matColumnDef="_id" class="calendarList_actions">
              <th mat-header-cell *matHeaderCellDef class="pl25">Actions</th>
              <td mat-cell *matCellDef="let c">
                <button mat-button
                        [routerLink]="['book', c._id]"
                        matTooltip="Réserver">
                  <mat-icon>assignment_turned_in</mat-icon>
                </button>
              </td>
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
  isDeleting: boolean = false;
  isLoading: boolean = false;
  refForm: FormGroup;
  httpOptions = {};


  dc: string[] = ['title', 'description', 'address', 'startDate', 'endDate', '_id'];
  calendars: Calendar[];
  calendarsToParticipate: Calendar[];

  constructor(private formBuilder: FormBuilder,
              protected http: HttpClient,
              public snackBar: MatSnackBar) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  ngOnInit() {
    this.getCalendars();
    this.getCalendarsToParticipate();
    this.refForm = this.formBuilder.group({
      refToShare: ['', Validators.required]
    });
  }

  //get all calendars (meetings) for the current user
  getCalendars() {
    this.isLoading = true;
    let userId = config.connectedUser()._id;
    return this.http.get<Calendar[]>(`${config.baseUrl}calendars/all/${userId}`, this.httpOptions).subscribe(
      calendars => {
        this.calendars = calendars;
        this.isLoading = false;
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000});
        this.isLoading = false;
      }
    );

  }

  //delete a calendar
  delete(id: string) {
    this.isDeleting = true;
    return this.http.post(`${config.baseUrl}calendars/delete`, {calendarId: id}, this.httpOptions).subscribe(
      calendar => {
        this.isDeleting = false;
        this.calendars = this.calendars.filter(c => c._id != id);
        this.snackBar.open('Suppression réussie', 'fermer', {duration: 1000});
      },
      error => {
        this.isDeleting = false;
        this.snackBar.open(error.message, 'fermer', {duration: 1000});
      }
    )
  };

  //participate to the meeting
  participate() {
    return this.http.post(`${config.baseUrl}invitations/invite`, {...this.refForm.value, ...{userId: config.connectedUser()._id}}, this.httpOptions).subscribe(
      data => {
        if (data['success']) {
          this.getCalendarsToParticipate();
          this.snackBar.open('Invitation réussie', 'fermer', {duration: 1000});
        } else {
          this.snackBar.open(data['msg'], 'fermer', {duration: 1000});
        }
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000});
      }
    )
  }

  //get all meeting invited to
  getCalendarsToParticipate() {
    let userId = config.connectedUser()._id;
    return this.http.get<Calendar[]>(`${config.baseUrl}invitations/calendars/${userId}`, this.httpOptions).subscribe(
      calendarsToParticipate => {
        this.calendarsToParticipate = calendarsToParticipate;
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000})
      }
    );
  }
}
