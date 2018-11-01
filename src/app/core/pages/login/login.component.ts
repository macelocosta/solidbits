import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc:AuthenticationService,
              private router:Router,
              private route: ActivatedRoute) { }

  private loginForm:FormGroup;
  private returnUrl:string;
  private formSubmitted:boolean;
  private lastSentData:any;
  private isLoading:boolean;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: Validators.compose([Validators.required, Validators.email])}),
      password: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(8)])})
    }, { updateOn: 'blur'});

    this.returnUrl = this.route.snapshot.queryParams['redirectTo'] || 'app';
  }

  get f() {
    return this.loginForm.controls;
  }

  onInputBlur() {
    if (this.formSubmitted && this.lastSentData) {
      this.loginForm.controls.email.setErrors({'invalid': true});
      this.loginForm.controls.password.setErrors({'invalid': true});
    }
  }

  onSubmit() {
    let email_invalid = this.loginForm.controls.email.hasError('invalid');
    let password_invalid = this.loginForm.controls.password.hasError('invalid');
    if (this.isLoading || this.lastSentData && this.loginForm.controls.email.value == this.lastSentData.email && this.loginForm.controls.password.value == this.lastSentData.password) {
      return;
    }
    this.formSubmitted = true;
    if ((email_invalid && password_invalid) || this.loginForm.valid) {
      this.isLoading = true;
      let user = new User(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
      this.authSvc.login(user).subscribe(
        data => {
          this.loginForm.controls.email.setErrors(null);
          this.loginForm.controls.password.setErrors(null);
          this.router.navigateByUrl(this.returnUrl);
        }, error => {
          this.loginForm.controls.email.setErrors({'invalid': true});
          this.loginForm.controls.password.setErrors({'invalid': true});
          this.isLoading = false;
          this.lastSentData = user;
        }
      )
    }
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigate(['']);
  }

}
