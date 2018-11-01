import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authSvc:AuthenticationService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  private recoverPasswordForm:FormGroup;
  private passwordRegex = /(?=(?:\D*\d){1}).*/;
  private formSubmitted:boolean;
  private isLoading:boolean;
  private isSuccess:boolean ;

  ngOnInit() {
    if (this.authSvc.isResetPasswordTokenValid()) {
      this.recoverPasswordForm = new FormGroup({
        password: new FormControl('', { validators: Validators.compose([Validators.required])}),
        password_r: new FormControl('', { validators: Validators.compose([Validators.required])})
      }, { updateOn: 'blur'});
      this.recoverPasswordForm.valueChanges.subscribe(() => {
        this.validateForm();
      });
    } else {
      this.router.navigate['/404'];
    }
  }

  get f() {
    return this.recoverPasswordForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;
    this.validateForm();
    if (this.recoverPasswordForm.valid) {
      this.isLoading = true;
      this.authSvc.resetPassword(this.recoverPasswordForm.value).subscribe(
        data => {
          this.isSuccess = true;
        }, error => {
          this.isLoading = false;
          if (error.status == 400) {
            alert('Não foi possível processar sua solicitação. Recarregue a página e tente novamente.' +
                  'Caso o erro persista, contate o suporte.');
          } else {
            alert('O servidor encontrou um problema ao processar sua solicitação. Recarregue a página ' +
                  'e tente novamente. Caso o erro persista, contate o suporte.');
          }
        }
      )
    }
  }

  validateForm() {
    if (!this.passwordRegex.test(this.f.password.value)) {
      this.f.password.setErrors({pattern: true});
    } else {
      this.f.password.setErrors(null);
    }
    if (this.f.password.value !== this.f.password_r.value) {
      this.f.password_r.setErrors({mismatch: true});
    } else {
      this.f.password_r.setErrors(null);
    }
    if (this.f.password.value.length < 8) {
      this.f.password.setErrors({minlength: true});
    } else {
      this.f.password.setErrors(null);
    }
    // console.log(this.f.password.);
  }

}
