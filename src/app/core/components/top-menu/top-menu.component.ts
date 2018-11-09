import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(private authSvc:AuthenticationService,
              private router:Router) {
                router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    this.updateCurrentRoute(event.url);
                  }
                });
              }
  
  private userName = this.authSvc.getLocalUserName();
  private isAuthenticated = this.authSvc.isLocalTokenValid();
  private notifications = [];
  private showLoginBtn:boolean;
  private isUserMenuVisible:boolean;
  private isAlarmVisible:boolean;

  ngOnInit() {
  }
  
  updateCurrentRoute(route:string) {
    this.isAuthenticated = this.authSvc.isLocalTokenValid();
    let currRoute = route.substring(1);
    if (currRoute.startsWith('app')) {
      if (!this.userName) {
        this.userName = this.authSvc.getLocalUserName();
      }
    }
    if (currRoute.length == 0 || currRoute.startsWith('app') || currRoute.startsWith('login') || this.authSvc.isLocalTokenValid()) {
      this.showLoginBtn = false;
    } else {
      this.showLoginBtn = true;
    }
  }

  onUserMenuClick():void {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  onAlarmClick():void {
    this.isAlarmVisible = true;
  }

  onOutsideMenuClick():void {
    this.isUserMenuVisible = false;
  }

  onOutsideAlarmClick():void {
    this.isAlarmVisible = false;
  }
  
  onBrandClick():void {
    if (this.authSvc.isLocalTokenValid()) {
      this.router.navigate(['/app']);
    } else {
      this.router.navigate(['']);
    }
  }

  onLogout():void {
    this.authSvc.logout();
  }
}
