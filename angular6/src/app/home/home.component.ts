import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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
  private usersUrl = 'http://localhost:3000/api/users';

  constructor(protected http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.http.get(`${this.usersUrl}/logout`).subscribe(
      data => {
        this.router.navigateByUrl('/');
        console.log(data);
      }
    )
  }
}
