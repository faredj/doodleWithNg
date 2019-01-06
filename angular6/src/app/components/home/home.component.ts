import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {config} from "../../shared/config";

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/home"><h3>Doodle</h3></a>
      <span class="fill-space"></span>
      <button mat-button [routerLink]="['/home/create']" routerLinkActive="active">Organiser une réunion</button>
      <button mat-button [routerLink]="['/home/']" routerLinkActive="active">Mes réunions</button>
      <button mat-button (click)="logout()">Se déconnecter</button>
    </mat-toolbar>
    <div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class HomeComponent implements OnInit {

  constructor(protected http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.destroyLocalUser();
    this.router.navigateByUrl('/');
  }

  //destroy local token and user
  destroyLocalUser(): void {
    localStorage.clear();
  }
}
