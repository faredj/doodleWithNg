import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  template: `
    <mat-card>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-card-title>
          <h5>Connexion</h5>
        </mat-card-title>
        <mat-card-content>
          <mat-form-field>
            <input matInput formControlName="email" placeholder="Email">
          </mat-form-field>
          <mat-form-field>
            <input matInput formControlName="password" placeholder="Mot de passe">
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions>
          <a mat-raised-button routerLink="/register">S'inscrire</a>
          <button mat-raised-button color="primary" [disabled]="!loginForm.valid">Se connecter</button>
        </mat-card-actions>
      </form>
    </mat-card>
  `
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
