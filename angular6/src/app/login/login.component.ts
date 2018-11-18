import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';

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
  private usersUrl = 'http://localhost:3000/api/users';
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, protected http: HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }

  private login(email: string, password: string) {
    console.log(email+'  '+password);
    return this.http.post(`${this.usersUrl}/login`, { email: email, password: password })
      .pipe().subscribe(
        user => {
        console.log(user);
        /*if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }*/
        return user;
      },
      error => {
        console.log(error);
    },);
  }

  private logout() {
    localStorage.removeItem('currentUser');
  }
}
