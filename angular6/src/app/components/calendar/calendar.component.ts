import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {CustomValidators} from "../../shared/customValidators";
import {Utils} from "../../shared/utils";
import {config} from "../../shared/config";
import {Calendar} from "../../models/Calendar";

@Component({
  selector: 'app-calendar',
  styleUrls: ['./calendar.component.css'],
  template: `
    <mat-card class="calendar_stepperCp">
      <h4>Organiser une réunion</h4>
      <mat-horizontal-stepper [linear]="isLinear" #stepper>
        <mat-step [stepControl]="generalFrom">
          <form [formGroup]="generalFrom">
            <ng-template matStepLabel>Général</ng-template>
            <mat-form-field>
              <input matInput placeholder="Titre" formControlName="title" required>
            </mat-form-field>
            <br/>
            <br/>
            <mat-form-field>
              <input matInput placeholder="Description" formControlName="description" required>
            </mat-form-field>
            <br/>
            <br/>
            <mat-form-field>
              <input matInput placeholder="Address" formControlName="address" required>
            </mat-form-field>
            <div>
              <button mat-button matStepperNext>Suivant</button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="datesForm">
          <form [formGroup]="datesForm">
            <ng-template matStepLabel>Calendrier</ng-template>
            <mat-form-field>
              <input matInput formControlName="startDate" [matDatepicker]="picker1" placeholder="Date de debut">
              <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
              <mat-datepicker #picker1></mat-datepicker>
            </mat-form-field>
            <mat-form-field class="margin-left30">
              <input matInput formControlName="endDate" [matDatepicker]="picker2" placeholder="Date de fin">
              <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
              <mat-datepicker #picker2></mat-datepicker>
            </mat-form-field>
            <div>
              <button mat-button matStepperPrevious>Précédent</button>
              <button mat-button matStepperNext>Suivant</button>
            </div>
          </form>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>Résumé</ng-template>
          <div *ngIf="generalFrom.valid && datesForm.valid">
            <p>Titre : <b>{{generalFrom.get('title').value}}</b></p>
            <p>Description :<b>{{generalFrom.get('description').value}}</b></p>
            <p>Lieux : <b>{{generalFrom.get('address').value}}</b></p>
            <p>Date debut : <b>{{utils.dateToString(datesForm.get('startDate').value)}}</b></p>
            <p>Date Fin : <b>{{utils.dateToString(datesForm.get('endDate').value)}}</b></p>
          </div>
          <div>
            <button mat-button matStepperPrevious>Précédent</button>
            <button mat-button (click)="stepper.reset()">Réinitialiser</button>
            <button mat-raised-button color="primary" (click)="onSubmit()">Soumettre</button>
          </div>
        </mat-step>
      </mat-horizontal-stepper>
    </mat-card>
  `
})
export class CalendarComponent implements OnInit {

  readonly utils = Utils;

  isLinear = true;
  generalFrom: FormGroup;
  datesForm: FormGroup;
  httpOptions = {};

  constructor(protected http: HttpClient,
              private router: Router,
              private formBuilder: FormBuilder,
              public snackBar: MatSnackBar) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  ngOnInit() {
    this.generalFrom = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.datesForm = this.formBuilder.group({
      startDate: ['', [Validators.required, CustomValidators.validDate]],
      endDate: ['', [Validators.required, CustomValidators.validDate]]
    }, {
      validator: CustomValidators.endDateAfterStartDate
    });
  }

  //add new reunion
  onSubmit() {
    return this.http.post<Calendar>(`${config.baseUrl}calendars/add`, this.formatCalendar({...this.generalFrom.value, ...this.datesForm.value}), this.httpOptions).subscribe(
      () => {
        this.router.navigateByUrl('/home');
        this.snackBar.open('Calendrier créé avec succès', 'fermer', {duration: 2000});
      },
      error => {
        this.snackBar.open(error.message, 'fermer', {duration: 2000})
      });
  }

  //format the calendar object
  formatCalendar(calendar: object): any {
    return {
      ...calendar,
      ...{
        'userId': config.connectedUser()._id,
        'dateCreation': new Date()
      }
    }
  }
}
