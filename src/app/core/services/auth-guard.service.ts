import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authSvc: AuthenticationService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authSvc.isAuthenticated().map(data => {
      if (data) {
        return true;
      } else {
        this.router.navigate(['login'], { queryParams: { redirectTo: state.url }});
        return false;
      }
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authSvc.isLocalTokenValid()) {
      return true;
    } else {
      this.router.navigate(['login'], { queryParams: { redirectTo: state.url }});
      return false;
    }
  }
}
