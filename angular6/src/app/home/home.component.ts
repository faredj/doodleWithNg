import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {config} from "../shared/config";

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  template: `
    <mat-toolbar color="primary">
      <span>Doodle</span>
      <span class="fill-space"></span>
      <button mat-button (click)="logout()">Se déconnecter</button>
    </mat-toolbar>
  `
})
export class HomeComponent implements OnInit {

  constructor(protected http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.http.get(`${config.baseUrl}users/logout`).subscribe(
      data => {
        this.destroyLocalUser();
        this.router.navigateByUrl('/');
      }
    )
  }

  destroyLocalUser(): void {
    localStorage.clear();
  }
}
