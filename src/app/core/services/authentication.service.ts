import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { JwtHelper } from 'angular2-jwt';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private router: Router,
              private idle: Idle) {
                idle.setIdle(1799); // 30min
                idle.setTimeout(1);
                idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
                idle.onIdleEnd.subscribe(() => this.sessionExpired = false);
                idle.onTimeout.subscribe(() => {
                  this.sessionExpired = true;
                  this.idle.stop();
                  this.logout(true);
                });
              }

  sessionExpired = false;
  jwtHelper: JwtHelper = new JwtHelper();
  tokenIdentifier = 'sb_webapp_tkn';

  public login(user: User): Observable<boolean> {
    return this.http.post<any>('/api/auth/login', { email: user.email, password: user.password }).map(data => {
      if (data.token) {
        this.sessionExpired = false;
        sessionStorage.setItem(this.tokenIdentifier, JSON.stringify(data.token));
      }
      return data;
    });
  }

  public logout(returning?: boolean): void {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.getLocalToken()}`});
    this.http.post<any>('/api/auth/logout', { headers: headers, observe: 'response' }).subscribe(data => {
      this.logoutActions(returning);
    }, e => {
      this.logoutActions(returning);
    });
  }

  private logoutActions(returning?) {
    this.idle.stop();
    sessionStorage.removeItem(this.tokenIdentifier);
    if (returning) {
      this.router.navigate(['auth/login'], { queryParams: { redirectTo: this.router.url }});
    } else {
      this.router.navigate(['auth/login']);
    }
  }

  public isAuthenticated(): Observable<boolean> {
    const token = sessionStorage.getItem(this.tokenIdentifier);
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.getLocalToken()}`});
        return this.http.get('/api/auth/protected', { headers: headers, observe: 'response' }).map(res => {
          if (res.status === 200) {
            // since the function isAuthenticated() is called after every login or reload, the startIdleTimeout() is placed here
            this.idle.watch();
            return true;
          } else {
            return false;
          }
        }).catch(e => {
          sessionStorage.removeItem(this.tokenIdentifier);
          return Observable.of(false);
        });
      }
    }
    sessionStorage.removeItem(this.tokenIdentifier);
    return Observable.of(false);
  }

  public isLocalTokenValid(): boolean {
    const token = sessionStorage.getItem(this.tokenIdentifier);
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
    }
    sessionStorage.removeItem(this.tokenIdentifier);
    return false;
  }

  public recoverPassword(email: string, captchaPayload: string) {
    return this.http.post<any>('api/auth/recover-password', { email: email, captchaPayload: captchaPayload }).map(res => {
      return res;
    });
  }

  public isResetPasswordTokenValid(): any {
    const token = window.location.href.split('=')[1];
    return this.http.get(`/api/auth/reset-password?token=${token}`, { observe: 'response' }).map(res => {
      if (res.status === 200) {
        return true;
      } else {
        this.router.navigate(['404']);
        return false;
      }
    }).catch(e => {
      this.router.navigate(['404']);
      return Observable.of(false);
    });
  }

  public resetPassword(passwordsData: any): Observable<any> {
    const token = window.location.href.split('=')[1];
    return this.http.post<any>(`api/auth/reset-password?token=${token}`,
                              { password: passwordsData.password, password_r: passwordsData.password_r }).map(res => {
      return res;
    });
  }

  public getLocalUserName(): any {
    const token = this.getLocalToken();
    return this.jwtHelper.decodeToken(token).name;
  }

  public getLocalUserSurname(): any {
    const token = this.getLocalToken();
    return this.jwtHelper.decodeToken(token).surname;
  }

  public getLocalUserEmail(): string {
    const token = this.getLocalToken();
    return this.jwtHelper.decodeToken(token).email;
  }

  public getLocalToken(): any {
    return JSON.parse(sessionStorage.getItem(this.tokenIdentifier));
  }

  public isSessionExpired() {
    return this.sessionExpired;
  }
}
