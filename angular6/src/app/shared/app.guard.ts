import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
              public jwtHelper: JwtHelperService) {
  }

  canActivate() {
    return this.checkValid();
  }

  private checkValid(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
