import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  styleUrls: ['./calendar.component.css'],
  template: `
    <mat-card class="calendar_stepperCp">
      <h4>Créer un calendrier</h4>
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
            <ng-template matStepLabel>Dates</ng-template>
            <mat-form-field>
              <input matInput placeholder="Address" formControlName="secondCtrl" required>
            </mat-form-field>
            <div>
              <button mat-button matStepperPrevious>Précédent</button>
              <button mat-button matStepperNext>Suivant</button>
            </div>
          </form>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>Résumé</ng-template>
          ok
          <div>
            <button mat-button matStepperPrevious>Précédent</button>
            <button mat-button (click)="stepper.reset()">Réinitialiser</button>
          </div>
        </mat-step>
      </mat-horizontal-stepper>
    </mat-card>
  `
})
export class CalendarComponent implements OnInit {

  isLinear = true;
  generalFrom: FormGroup;
  datesForm: FormGroup;

  constructor(protected http: HttpClient,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.generalFrom = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.datesForm = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
