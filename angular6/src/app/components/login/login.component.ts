import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {config} from "../../shared/config";

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
            <input matInput type="password" formControlName="password" placeholder="Mot de passe">
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

  constructor(private formBuilder: FormBuilder,
              protected http: HttpClient,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }

  //authenticate the user
  private login(email: string, password: string) {
    return this.http.post(`${config.baseUrl}users/login`, {email: email, password: password})
      .pipe().subscribe(
        data => {
          if (data['success']) {
            this.snackBar.open('Connexion réussie', 'fermer', {duration: 1000});
            localStorage.setItem('token', data['token']);
            localStorage.setItem('user', JSON.stringify(data['user']));
            this.router.navigateByUrl('/home');
          } else {
            this.snackBar.open('Email ou mot de passes invalides', 'fermer', {duration: 1000});
          }
        },
        error => {
          this.snackBar.open('Connexion échouée', 'fermer', {duration: 1000})
        },
      );
  }
}
