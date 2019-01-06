import {Component, OnInit} from '@angular/core';
import {Calendar} from "../../models/Calendar";
import {config} from "../../shared/config";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {Utils} from "../../shared/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/User";

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Component({
  selector: 'app-calendar-list',
  styleUrls: ['./calendar-list.component.css'],
  template: `
    <div>
      <mat-card class="calendarList_container">
        <mat-card-title class="calendarList_titleCard">
          <h5>Mes réunions</h5>
          <div class="calendarList_fieldShare">
            <mat-card>
              <form [formGroup]="refForm" (ngSubmit)="onSubmit()">
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
    </div>
  `
})
export class CalendarListComponent implements OnInit {

  readonly utils = Utils;
  isDeleting: boolean = false;
  refForm: FormGroup;

  dc: string[] = ['title', 'description', 'address', 'startDate', 'endDate', '_id'];
  calendars: Calendar[];

  constructor(private formBuilder: FormBuilder,
              protected http: HttpClient,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getCalendars();
    this.refForm = this.formBuilder.group({
      refToShare: ['', Validators.required]
    });
  }

  getCalendars() {
    let userId = config.connectedUser()._id;
    return this.http.get<Calendar[]>(`${config.baseUrl}calendars/all/${userId}`, httpOptions).subscribe(
      calendars => {
        this.calendars = calendars;
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000})
      }
    );
  }

  delete(id: string) {
    this.isDeleting = true;
    return this.http.post(`${config.baseUrl}calendars/delete`, {calendarId: id}, httpOptions).subscribe(
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

  onSubmit() {
    console.log(this.refForm.value);
    return this.http.post(`${config.baseUrl}invite`, {...this.refForm.value, ...{userId: config.connectedUser()._id}}, httpOptions).subscribe(
      data => {
        if(data['success']){
          this.snackBar.open('Invitation réussie', 'fermer', {duration: 1000});
        }else{
          this.snackBar.open(data['msg'], 'fermer', {duration: 1000});
        }
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 1000});
      }
    )
  }
}
