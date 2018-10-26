import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
              private authSvc:AuthenticationService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  private recoverPasswordForm:FormGroup;
  private token = this.activatedRoute.snapshot.queryParams['token'];

  // TODO:
  ngOnInit() {
    if (this.authSvc.isRecoverPasswordTokenValid(this.token)) {
      this.recoverPasswordForm = this.formBuilder.group({
        password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        password_r: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
      });
    } else {
      this.router.navigate['/404'];
    }
  }

  // TODO:
  onSubmit() {
    if (this.recoverPasswordForm.valid) {
      // if (this.authSvc.login()) {
      //   this.router.navigate(['/app']);
      // }
    } else {
      console.log('logging out..');
      return false;
    }
  }

}
