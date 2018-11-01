import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecaptchaModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { RecaptchaSettings } from 'ng-recaptcha/recaptcha/recaptcha-settings';

import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';

import { CoreRoutingModule } from './core-routing.module';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    CoreRoutingModule
  ],
  declarations: [TopMenuComponent, LandingComponent, NotFoundComponent, LoginComponent, ResetPasswordComponent, ForgotPasswordComponent],
  exports: [RouterModule, TopMenuComponent],
  providers: [AuthenticationService, AuthGuardService,
    { provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LdEx3cUAAAAAHXtCfBfUWUGy1ttPAYr7Et-q6kS'
      } as RecaptchaSettings
    }
  ]
})
export class CoreModule { }
