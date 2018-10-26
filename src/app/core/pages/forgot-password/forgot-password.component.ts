import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authSvc: AuthenticationService,
              private router: Router) { }

  private forgotPasswordForm: FormGroup;
  private captchaResolved: boolean;
  private captchaPayload: any;

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  resolveCaptcha(e) {
    this.captchaPayload = e;
    this.captchaResolved = true;
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.router.navigate(['/']);
    }
  }

}
