import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  private isLoading: boolean;
  private formSubmitted: boolean;
  private isDone: boolean;

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', { validators: Validators.compose([Validators.required, Validators.email])}),
    }, { updateOn: 'blur'});
  }

  resolveCaptcha(e) {
    this.captchaPayload = e;
    this.captchaResolved = true;
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (!this.captchaResolved || !this.captchaPayload) {
      this.captchaResolved = false;
    }
    if (this.forgotPasswordForm.valid && this.captchaResolved) {
      this.isLoading = true;
      this.authSvc.recoverPassword(this.forgotPasswordForm.controls.email.value, this.captchaPayload).subscribe(
        data => {
          this.isDone = true;
          console.log(data);
        }, error => {
          this.isLoading = false;
          if (error.error == 'Request already made') {
            this.forgotPasswordForm.controls.email.setErrors({'invalid': true});
          } else if (error.status === 400) {
            alert('Não foi possível processar a solicitação. Recarregue a página e tente novamente.');
          } else {
            alert('Encontramos um problema ao processar a solicitação. Recarregue a página e tente novamente. Caso o problema persista, ' +
                  'por favor contate o suporte.');
          }
        }
      );
    }
  }

}
