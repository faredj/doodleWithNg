import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }  from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/User';
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.css'],
  template: `
    <mat-card>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <mat-card-title>
          <h5>Inscription</h5>
        </mat-card-title>
        <mat-card-content>
          <mat-form-field class="register-prenom">
            <input matInput formControlName="firstName" placeholder="Prénom">
          </mat-form-field>
          <mat-form-field class="register-nom">
            <input matInput formControlName="lastName" placeholder="Nom">
          </mat-form-field>
          <mat-form-field>
            <input matInput formControlName="birthday" [matDatepicker]="picker" placeholder="Date de naissance">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <mat-form-field>
            <input matInput formControlName="email" placeholder="Email">
          </mat-form-field>
          <mat-form-field>
            <input matInput formControlName="password" placeholder="Mot de passe">
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions>
          <a mat-raised-button routerLink="/">Retour</a>
          <button mat-raised-button color="primary" [disabled]="!registerForm.valid">S'inscrire</button>
        </mat-card-actions>
      </form>
    </mat-card>
  `
})

export class RegisterComponent implements OnInit {
  private usersUrl = 'http://localhost:3000/api/users';
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, protected http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    return this.http.post<User>(`${this.usersUrl}/register`, this.registerForm.value, httpOptions).subscribe(
      (val) => {
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }
}
